-- Inkspire Supabase bootstrap
-- Run this file in the Supabase SQL Editor for a first-time database setup.

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'blog_status') then
    create type blog_status as enum ('draft', 'published', 'scheduled');
  end if;

  if not exists (select 1 from pg_type where typname = 'notification_type') then
    create type notification_type as enum ('like', 'comment', 'reply', 'follow', 'mention', 'bookmark', 'system');
  end if;

  if not exists (select 1 from pg_type where typname = 'report_status') then
    create type report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (char_length(username) between 3 and 32),
  full_name text,
  bio text,
  avatar_url text,
  cover_url text,
  website text,
  twitter_url text,
  github_url text,
  linkedin_url text,
  location text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content_html text not null,
  content_json jsonb not null,
  status blog_status not null default 'draft',
  featured_image_url text,
  cover_image_url text,
  seo_title text,
  seo_description text,
  canonical_url text,
  reading_time_minutes integer not null default 1,
  published_at timestamptz,
  scheduled_for timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  view_count integer not null default 0,
  like_count integer not null default 0,
  comment_count integer not null default 0,
  bookmark_count integer not null default 0,
  is_featured boolean not null default false,
  search_document tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content_html, '')), 'C')
  ) stored
);

create table if not exists public.blog_tags (
  blog_id uuid not null references public.blogs(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (blog_id, tag_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid not null references public.blogs(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.likes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  blog_id uuid not null references public.blogs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, blog_id)
);

create table if not exists public.bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  blog_id uuid not null references public.blogs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, blog_id)
);

create table if not exists public.followers (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  blog_id uuid references public.blogs(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  type notification_type not null,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  blog_id uuid references public.blogs(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  reason text not null,
  details text,
  status report_status not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);

create index if not exists blogs_author_idx on public.blogs(author_id);
create index if not exists blogs_category_idx on public.blogs(category_id);
create index if not exists blogs_status_idx on public.blogs(status, published_at desc nulls last);
create index if not exists blogs_search_idx on public.blogs using gin(search_document);
create index if not exists comments_blog_idx on public.comments(blog_id, created_at desc);
create index if not exists notifications_user_idx on public.notifications(user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  generated_username text;
begin
  generated_username :=
    coalesce(
      nullif(new.raw_user_meta_data->>'username', ''),
      nullif(split_part(new.email, '@', 1), ''),
      'user_' || substr(new.id::text, 1, 8)
    );

  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    lower(regexp_replace(generated_username, '[^a-zA-Z0-9_]+', '', 'g')),
    nullif(new.raw_user_meta_data->>'full_name', ''),
    nullif(new.raw_user_meta_data->>'avatar_url', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row execute function public.set_updated_at();

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.blogs enable row level security;
alter table public.blog_tags enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.bookmarks enable row level security;
alter table public.followers enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "profiles are public readable" on public.profiles;
create policy "profiles are public readable"
on public.profiles for select
using (true);

drop policy if exists "profile owners manage their row" on public.profiles;
create policy "profile owners manage their row"
on public.profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "categories readable" on public.categories;
create policy "categories readable"
on public.categories for select
using (true);

drop policy if exists "tags readable" on public.tags;
create policy "tags readable"
on public.tags for select
using (true);

drop policy if exists "published blogs readable" on public.blogs;
create policy "published blogs readable"
on public.blogs for select
using (status = 'published' or auth.uid() = author_id);

drop policy if exists "authors create blogs" on public.blogs;
create policy "authors create blogs"
on public.blogs for insert
with check (auth.uid() = author_id);

drop policy if exists "authors update blogs" on public.blogs;
create policy "authors update blogs"
on public.blogs for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

drop policy if exists "authors delete blogs" on public.blogs;
create policy "authors delete blogs"
on public.blogs for delete
using (auth.uid() = author_id);

drop policy if exists "blog tags readable" on public.blog_tags;
create policy "blog tags readable"
on public.blog_tags for select
using (true);

drop policy if exists "authors manage blog tags" on public.blog_tags;
create policy "authors manage blog tags"
on public.blog_tags for all
using (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_tags.blog_id and blogs.author_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.blogs
    where blogs.id = blog_tags.blog_id and blogs.author_id = auth.uid()
  )
);

drop policy if exists "comments readable for published blogs" on public.comments;
create policy "comments readable for published blogs"
on public.comments for select
using (
  exists (
    select 1 from public.blogs
    where blogs.id = comments.blog_id
      and (blogs.status = 'published' or blogs.author_id = auth.uid())
  )
);

drop policy if exists "authenticated users create comments" on public.comments;
create policy "authenticated users create comments"
on public.comments for insert
with check (auth.uid() = author_id);

drop policy if exists "comment owners update or delete" on public.comments;
create policy "comment owners update or delete"
on public.comments for all
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

drop policy if exists "users manage likes" on public.likes;
create policy "users manage likes"
on public.likes for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users manage bookmarks" on public.bookmarks;
create policy "users manage bookmarks"
on public.bookmarks for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users manage follows" on public.followers;
create policy "users manage follows"
on public.followers for all
using (auth.uid() = follower_id)
with check (auth.uid() = follower_id);

drop policy if exists "users read own notifications" on public.notifications;
create policy "users read own notifications"
on public.notifications for select
using (auth.uid() = user_id);

drop policy if exists "system inserts notifications" on public.notifications;
create policy "system inserts notifications"
on public.notifications for insert
with check (auth.uid() = user_id or auth.role() = 'service_role');

drop policy if exists "users update own notifications" on public.notifications;
create policy "users update own notifications"
on public.notifications for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "users create reports" on public.reports;
create policy "users create reports"
on public.reports for insert
with check (auth.uid() = reporter_id);

drop policy if exists "users read own reports" on public.reports;
create policy "users read own reports"
on public.reports for select
using (auth.uid() = reporter_id or auth.role() = 'service_role');

drop policy if exists "newsletter insert public" on public.newsletter_subscribers;
create policy "newsletter insert public"
on public.newsletter_subscribers for insert
with check (true);

insert into public.categories (name, slug, description)
values
  ('Technology', 'technology', 'Broader technology trends, products, and engineering culture.'),
  ('Programming', 'programming', 'Language design, architecture, and day-to-day coding practice.'),
  ('Web Development', 'web-development', 'Frontend, backend, performance, and developer experience on the web.'),
  ('AI', 'ai', 'Applied AI, tooling, workflows, and product strategy.'),
  ('Machine Learning', 'machine-learning', 'Models, training systems, evaluation, and ML operations.'),
  ('Cloud', 'cloud', 'Cloud infrastructure, distributed systems, and platform engineering.'),
  ('Cyber Security', 'cyber-security', 'Security practices, incident response, and application hardening.'),
  ('Data Science', 'data-science', 'Data workflows, analytics, experimentation, and insight generation.'),
  ('Blockchain', 'blockchain', 'Protocols, web3 architecture, and decentralized application design.'),
  ('DevOps', 'devops', 'CI/CD, observability, reliability, and release engineering.'),
  ('Career', 'career', 'Career growth, leadership, interviewing, and team effectiveness.'),
  ('Business', 'business', 'Strategy, operations, growth, and company building.'),
  ('Finance', 'finance', 'Fintech, markets, budgeting, and financial decision making.'),
  ('Health', 'health', 'Health technology, wellbeing, and sustainable work habits.'),
  ('Lifestyle', 'lifestyle', 'Personal systems, routines, and everyday living.'),
  ('Travel', 'travel', 'Remote work journeys, travel systems, and destination stories.'),
  ('Gaming', 'gaming', 'Game design, game technology, and player culture.'),
  ('Food', 'food', 'Food systems, cooking, and stories around dining.'),
  ('Movies', 'movies', 'Film analysis, storytelling, and media craft.'),
  ('Sports', 'sports', 'Sports business, performance, and fan experiences.')
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description;
