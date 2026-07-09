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

create policy "profiles are public readable"
on public.profiles for select
using (true);

create policy "profile owners manage their row"
on public.profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "categories readable"
on public.categories for select
using (true);

create policy "tags readable"
on public.tags for select
using (true);

create policy "published blogs readable"
on public.blogs for select
using (status = 'published' or auth.uid() = author_id);

create policy "authors create blogs"
on public.blogs for insert
with check (auth.uid() = author_id);

create policy "authors update blogs"
on public.blogs for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "authors delete blogs"
on public.blogs for delete
using (auth.uid() = author_id);

create policy "blog tags readable"
on public.blog_tags for select
using (true);

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

create policy "comments readable for published blogs"
on public.comments for select
using (
  exists (
    select 1 from public.blogs
    where blogs.id = comments.blog_id
      and (blogs.status = 'published' or blogs.author_id = auth.uid())
  )
);

create policy "authenticated users create comments"
on public.comments for insert
with check (auth.uid() = author_id);

create policy "comment owners update or delete"
on public.comments for all
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

create policy "users manage likes"
on public.likes for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users manage bookmarks"
on public.bookmarks for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users manage follows"
on public.followers for all
using (auth.uid() = follower_id)
with check (auth.uid() = follower_id);

create policy "users read own notifications"
on public.notifications for select
using (auth.uid() = user_id);

create policy "system inserts notifications"
on public.notifications for insert
with check (auth.uid() = user_id or auth.role() = 'service_role');

create policy "users update own notifications"
on public.notifications for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users create reports"
on public.reports for insert
with check (auth.uid() = reporter_id);

create policy "users read own reports"
on public.reports for select
using (auth.uid() = reporter_id or auth.role() = 'service_role');

create policy "newsletter insert public"
on public.newsletter_subscribers for insert
with check (true);
