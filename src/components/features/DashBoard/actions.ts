"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import dateFormater from "@/utils/dateFormater";

export async function getCardInfo() {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabase = createClient();

  const { data, error } = await supabase.from("test_product").select("*");

  if (error) {
    console.log(error);
  }
  console.log({
    ...data[0],
    created_at: dateFormater(data[0].created_at),
  });

  return {
    ...data[0],
    created_at: dateFormater(data[0].created_at),
  };

  // revalidatePath("/", "layout");
  // redirect("/");
}

export async function randomCardPickup() {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabase = createClient();

  const { data, error } = await supabase
    .from("test")
    .insert({ id: 1, name: "Denmark" })
    .select();

  if (error) {
    redirect("/error");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}
