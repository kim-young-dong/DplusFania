import { createBrowserClient } from "@supabase/ssr";
const $supabase = createBrowserClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
export { $supabase };
