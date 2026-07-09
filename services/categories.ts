import { cache } from "react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type CategorySummary = Pick<Database["public"]["Tables"]["categories"]["Row"], "id" | "name" | "slug" | "description">;

export const getPopularCategories = cache(async () => {
  const supabase = (await createSupabaseServerClient()) as any;

  const { data, error }: { data: CategorySummary[] | null; error: { message: string } | null } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .limit(8);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});
