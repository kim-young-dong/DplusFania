import createServerClient from "@/utils/supabase/server";
import { z } from "zod";
// 사용자 정보 타입 정의 (필요에 따라 변경)
const zUser = z.nullable(
  z.object({
    id: z.string(),
    email: z.string().optional(),
  }),
);
type UserType = z.infer<typeof zUser>;

class UserStore {
  private static instance: UserStore;
  private user: UserType | null = null; // 사용자 정보 저장
  private isAuthenticated: boolean = false; // 로그인 상태 확인
  private count: number = 0; // 테스트용

  private constructor() {}

  public static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }

  // 사용자 정보 설정
  public async setUser(user?: UserType): Promise<void> {
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
    } else {
      try {
        const supabase = createServerClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          this.user = {
            id: user.id,
            email: user.email,
          };
          this.isAuthenticated = true;
        }
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
      }
    }
  }

  // 사용자 정보 가져오기
  public async getUser(): Promise<UserType | null> {
    if (!this.user) {
      await this.setUser();
    }
    return this.user;
  }

  // 로그인 상태 확인
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // 로그아웃 처리
  logout(): void {
    this.user = null;
    this.isAuthenticated = false;
  }
  // test용
  public addCount(): number {
    return this.count++;
  }
}
const userStore = UserStore.getInstance(); // 싱글톤 패턴 적용

export default userStore;
