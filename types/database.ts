export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type TableDefinition<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type ProfileRow = {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  website: string | null;
  twitter_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  location: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
};

type BlogRow = {
  id: string;
  author_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content_html: string;
  content_json: Json;
  status: "draft" | "published" | "scheduled";
  featured_image_url: string | null;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  reading_time_minutes: number;
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  bookmark_count: number;
  is_featured: boolean;
};

type BlogInsert = Omit<BlogRow, "id" | "created_at" | "updated_at" | "view_count" | "like_count" | "comment_count" | "bookmark_count"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  bookmark_count?: number;
};

type BlogTagRow = {
  blog_id: string;
  tag_id: string;
};

type CommentRow = {
  id: string;
  blog_id: string;
  author_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
};

type NotificationRow = {
  id: string;
  user_id: string;
  actor_id: string | null;
  blog_id: string | null;
  comment_id: string | null;
  type: "like" | "comment" | "reply" | "follow" | "mention" | "bookmark" | "system";
  payload: Json;
  read_at: string | null;
  created_at: string;
};

export interface Database {
  public: {
    Tables: {
      profiles: TableDefinition<ProfileRow, ProfileRow, Partial<ProfileRow>>;
      categories: TableDefinition<CategoryRow, Omit<CategoryRow, "id" | "created_at"> & { id?: string; created_at?: string }, Partial<CategoryRow>>;
      tags: TableDefinition<
        { id: string; name: string; slug: string; created_at: string },
        { id?: string; name: string; slug: string; created_at?: string },
        { name?: string; slug?: string }
      >;
      blogs: TableDefinition<BlogRow, BlogInsert, Partial<BlogInsert>>;
      blog_tags: TableDefinition<BlogTagRow, BlogTagRow, BlogTagRow>;
      comments: TableDefinition<CommentRow, Omit<CommentRow, "id" | "created_at" | "updated_at"> & { id?: string }, Partial<CommentRow>>;
      likes: TableDefinition<{ user_id: string; blog_id: string; created_at: string }, { user_id: string; blog_id: string; created_at?: string }, never>;
      bookmarks: TableDefinition<{ user_id: string; blog_id: string; created_at: string }, { user_id: string; blog_id: string; created_at?: string }, never>;
      followers: TableDefinition<
        { follower_id: string; following_id: string; created_at: string },
        { follower_id: string; following_id: string; created_at?: string },
        never
      >;
      notifications: TableDefinition<NotificationRow, Omit<NotificationRow, "id" | "created_at"> & { id?: string; created_at?: string }, Partial<NotificationRow>>;
      reports: TableDefinition<
        { id: string; reporter_id: string; blog_id: string | null; comment_id: string | null; reason: string; details: string | null; status: string; created_at: string },
        { id?: string; reporter_id: string; blog_id?: string | null; comment_id?: string | null; reason: string; details?: string | null; status?: string; created_at?: string },
        Partial<{ reason: string; details: string | null; status: string }>
      >;
      newsletter_subscribers: TableDefinition<{ email: string; created_at: string }, { email: string; created_at?: string }, never>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      blog_status: "draft" | "published" | "scheduled";
      notification_type: "like" | "comment" | "reply" | "follow" | "mention" | "bookmark" | "system";
      report_status: "open" | "reviewing" | "resolved" | "dismissed";
    };
    CompositeTypes: Record<string, never>;
  };
}
