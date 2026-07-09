import { cache } from "react";
import { notFound } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type ArticleDetails = Pick<
  Database["public"]["Tables"]["blogs"]["Row"],
  "id" | "title" | "slug" | "excerpt" | "content_html" | "published_at" | "reading_time_minutes" | "view_count" | "author_id"
> & {
  author: Pick<Database["public"]["Tables"]["profiles"]["Row"], "username" | "full_name" | "bio"> | null;
};

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleDetails> => {
  const supabase = (await createSupabaseServerClient()) as any;

  const { data: article, error }: {
    data: Pick<
      Database["public"]["Tables"]["blogs"]["Row"],
      "id" | "title" | "slug" | "excerpt" | "content_html" | "published_at" | "reading_time_minutes" | "view_count" | "author_id"
    > | null;
    error: { message: string } | null;
  } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, content_html, published_at, reading_time_minutes, view_count, author_id")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !article) {
    notFound();
  }

  const { data: author }: {
    data: Pick<Database["public"]["Tables"]["profiles"]["Row"], "username" | "full_name" | "bio"> | null;
  } = await supabase
    .from("profiles")
    .select("username, full_name, bio")
    .eq("id", article.author_id)
    .single();

  return {
    ...article,
    author
  };
});
