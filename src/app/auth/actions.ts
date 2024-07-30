"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signin(formData: { email: string; password: string }) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: { email: string; password: string }) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
