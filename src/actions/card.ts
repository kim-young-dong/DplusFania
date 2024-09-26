"use server";

import createClient from "@/utils/supabase/server";
import dateFormater from "@/utils/dateFormater";
import userStore from "@/constant/auth";
import { getRandomNumber } from "@/constant/math";
import { redirect } from "next/navigation";
import { z } from "zod";

// 사용자 정보 타입 정의 (필요에 따라 변경)
const zCard = z.object({
  name: z.string(),
  player: z.object({
    type: z.string(),
    player: z.string(),
    position: z.string(),
  }),
  imgURL: z.string(),
  user_id: z.string(),
});

export type CardProduct = z.infer<typeof zCard>;

// Get
export async function getRandomCard() {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.log(error);
  }
  const card = data ? data[getRandomNumber(data.length - 1)] : null;
  delete card?.id;

  return card;
}

export async function getTodaysCard(): Promise<CardProduct | null> {
  const supabase = createClient();

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("collection")
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
    return null;
  }
}

// Post
export async function randomCardPickup(): Promise<CardProduct | null> {
  const supabase = createClient();

  const user = await userStore.getUser();
  // user 또는 user.id가 undefined인 경우 함수 종료
  if (!user || !user.id) {
    console.log("User not found or user ID is undefined");
    // 추가로 에러 처리 로직을 작성해야 함
    redirect("/");
    return null;
  }
  const insertData: CardProduct = await getRandomCard();

  const { data, error } = await supabase
    .from("collection")
    .insert({ ...insertData, user_id: user.id });

  if (error) {
    console.log(error);
    // 추가로 에러 처리 로직을 작성해야 함
    // redirect("/error");
    return null;
  }

  return await getTodaysCard();

  // revalidatePath("/", "layout");
  // redirect("/");
}
