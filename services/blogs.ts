import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type HomepageArticle = Pick<
  Database["public"]["Tables"]["blogs"]["Row"],
  "id" | "title" | "slug" | "excerpt" | "featured_image_url" | "reading_time_minutes" | "published_at" | "view_count" | "like_count"
>;

export const getHomepageFeed = cache(async () => {
  const supabase = (await createSupabaseServerClient()) as any;

  const { data, error }: { data: HomepageArticle[] | null; error: { message: string } | null } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, featured_image_url, reading_time_minutes, published_at, view_count, like_count")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(12);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});
