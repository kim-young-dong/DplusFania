"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import createClient from "@/utils/supabase/server";

export async function signin(formData: { email: string; password: string }) {
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    throw error;
  }

  const user = {
    id: data.user.id,
    email: data.user.email || "",
  };

  return user;
}

export async function signup(formData: { email: string; password: string }) {
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const supabase = createClient();

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    console.log(error);

    return error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);

    return error;
  }

  redirect("/");
}

export async function getUser() {
  const supabase = createClient();
  const sbAccessToken = cookies().get("sb_access_token")?.value;
  // const sbRefreshToken = cookies().get("sb_refresh_token")?.value;

  if (!sbAccessToken) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(sbAccessToken);

  if (error) {
    return null;
  }

  return data.user;
}
