import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type FeaturedAuthor = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "username" | "full_name" | "bio" | "avatar_url" | "is_verified"
>;

export const getFeaturedAuthors = cache(async () => {
  const supabase = (await createSupabaseServerClient()) as any;

  const { data, error }: { data: FeaturedAuthor[] | null; error: { message: string } | null } = await supabase
    .from("profiles")
    .select("id, username, full_name, bio, avatar_url, is_verified")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});
