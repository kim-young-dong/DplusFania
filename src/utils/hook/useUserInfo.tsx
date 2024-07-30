import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const useUserInfo = async () => {
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll();
        },
      },
    }
  );

  const getUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return user;
    } catch (error) {
      return null;
    }
  };
  const user = await getUser();

  return user;
};
