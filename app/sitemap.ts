import type { MetadataRoute } from "next";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  let blogs: Pick<Database["public"]["Tables"]["blogs"]["Row"], "slug" | "updated_at">[] | null = null;

  if (hasSupabaseEnv) {
    const supabaseAdmin = createSupabaseAdminClient();
    const result: { data: Pick<Database["public"]["Tables"]["blogs"]["Row"], "slug" | "updated_at">[] | null } = await (supabaseAdmin as any)
      .from("blogs")
      .select("slug, updated_at")
      .eq("status", "published")
      .limit(5000);

    blogs = result.data;
  }

  const staticRoutes: MetadataRoute.Sitemap = ["", "/articles", "/categories", "/authors"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));

  const blogRoutes: MetadataRoute.Sitemap =
    blogs?.map((blog) => ({
      url: `${siteUrl}/articles/${blog.slug}`,
      lastModified: new Date(blog.updated_at)
    })) ?? [];

  return [...staticRoutes, ...blogRoutes];
}
