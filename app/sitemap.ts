import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: blogs }: { data: Pick<Database["public"]["Tables"]["blogs"]["Row"], "slug" | "updated_at">[] | null } = await (supabaseAdmin as any)
    .from("blogs")
    .select("slug, updated_at")
    .eq("status", "published")
    .limit(5000);

  const staticRoutes: MetadataRoute.Sitemap = ["", "/articles", "/categories", "/authors"].map((route) => ({
    url: `${env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date()
  }));

  const blogRoutes: MetadataRoute.Sitemap =
    blogs?.map((blog) => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}/articles/${blog.slug}`,
      lastModified: new Date(blog.updated_at)
    })) ?? [];

  return [...staticRoutes, ...blogRoutes];
}
