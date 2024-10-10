"use server";

import createClient from "@/utils/supabase/server";
import dateFormater from "@/utils/dateFormater";
import { getUser } from "@/actions/auth";
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
  // products 테이블에서 랜덤한 카드 데이터를 1개 가져옴

  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  if (!count) {
    console.log("Error: No count");
    return null;
  }

  // 랜덤 인덱스를 생성합니다.
  const randomIndex = Math.floor(Math.random() * count);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .range(randomIndex, randomIndex);

  if (error) {
    console.log("Error: No data");
    console.log(error);
  }
  const card = data ? data[0] : null;
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

  const user = await getUser();
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
