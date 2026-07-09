# Inkspire

Inkspire is a production-oriented publishing platform built with Next.js 15, React 19, TypeScript, Supabase, and Cloudflare R2.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase PostgreSQL + Auth
- Cloudflare R2 signed uploads
- TanStack Query
- shadcn/ui style component primitives

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in every value.
3. Run [`supabase/setup.sql`](C:/Users/avani/Desktop/blog/supabase/setup.sql) in the Supabase SQL editor.
4. Run `npm run dev`.

## Supabase Database

- Primary bootstrap SQL: [`supabase/setup.sql`](C:/Users/avani/Desktop/blog/supabase/setup.sql)
- Raw schema only: [`supabase/schema.sql`](C:/Users/avani/Desktop/blog/supabase/schema.sql)
- Raw RLS policies only: [`supabase/rls.sql`](C:/Users/avani/Desktop/blog/supabase/rls.sql)

`supabase/setup.sql` includes:

- extensions and enum types
- all core tables
- indexes and update triggers
- automatic profile creation trigger for new `auth.users`
- row level security policies
- starter category seed data

## Current foundation

- Premium landing page and site shell
- Supabase SSR auth wiring
- Protected dashboard routes
- Cloudflare R2 presigned upload endpoint
- Draft creation via server actions
- SEO metadata, `robots.txt`, and `sitemap.xml`

## Next build slices

- Rich TipTap editor extensions
- Full profile completion flow
- Comments, follows, notifications, analytics, and admin workflows
- Deep test coverage and seed automation
