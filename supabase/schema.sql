create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

create type blog_status as enum ('draft', 'published', 'scheduled');
create type notification_type as enum ('like', 'comment', 'reply', 'follow', 'mention', 'bookmark', 'system');
create type report_status as enum ('open', 'reviewing', 'resolved', 'dismissed');

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

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger blogs_set_updated_at
before update on public.blogs
for each row execute function public.set_updated_at();

create trigger comments_set_updated_at
before update on public.comments
for each row execute function public.set_updated_at();
