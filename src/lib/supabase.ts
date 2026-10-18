import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  ""
).trim();
const resolvedSupabaseUrl =
  supabaseUrl || import.meta.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";

const isValidSupabaseUrl = (() => {
  try {
    const parsedUrl = new URL(resolvedSupabaseUrl);
    const isLocalHttp =
      parsedUrl.protocol === "http:" &&
      (parsedUrl.hostname === "localhost" ||
        parsedUrl.hostname === "127.0.0.1");
    return (
      (parsedUrl.protocol === "https:" || isLocalHttp) &&
      !parsedUrl.hostname.includes("your-project-id")
    );
  } catch {
    return false;
  }
})();

export const isSupabaseConfigured = Boolean(
  isValidSupabaseUrl &&
    supabaseAnonKey &&
    !supabaseAnonKey.startsWith("your-"),
);

export const supabase = isSupabaseConfigured
  ? createClient(resolvedSupabaseUrl, supabaseAnonKey)
  : null;

export type Inquiry = {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  category: string;
  is_published: boolean;
  created_at: string;
};
