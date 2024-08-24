"use server";

import { createClient } from "@/utils/supabase/server";
import dateFormater from "@/utils/dateFormater";
import { GET_RANDOM_CARD } from "@/constant/card";
import userStore from "@/constant/auth";
import { z } from "zod";

import { redirect } from "next/navigation";

// 사용자 정보 타입 정의 (필요에 따라 변경)
const zCard = z.object({
  name: z.string(),
  player: z.object({
    name: z.string(),
    position: z.string(),
  }),
  imgURL: z.string(),
  user_id: z.string(),
});

export type CardProduct = z.infer<typeof zCard>;

// Get
export async function getTodaysCard(): Promise<CardProduct | null> {
  const supabase = createClient();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("card_products")
    .select("*")
    .gte("created_at", today)
    .lt("created_at", tomorrow);

  if (error) {
    console.log(error);
  }

  if (data && data.length > 0) {
    return {
      ...data[0],
      created_at: dateFormater(data[0].created_at),
    };
  } else {
    console.log("data is empth");
    return null;
  }
}

export async function randomCardPickup(): Promise<CardProduct | null> {
  const user = await userStore.getUser();

  // user 또는 user.id가 undefined인 경우 함수 종료
  if (!user || !user.id) {
    console.log("User not found or user ID is undefined");
    redirect("/");
  }

  const insertData: CardProduct = { ...GET_RANDOM_CARD(), user_id: user.id };

  const supabase = createClient();

  const { data, error } = await supabase
    .from("card_products")
    .insert(insertData);

  if (error) {
    console.log(error);

    // redirect("/error");
  }
  return await getTodaysCard();

  // revalidatePath("/", "layout");
  // redirect("/");
}
