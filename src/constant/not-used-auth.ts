import { getUser } from "@/actions/auth";
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

/* 싱글톤 패턴을 적용해 서버 단에서 사용자 정보를 공유하는 아이디어를 구현하려 했으나, 사용하지 않는 코드입니다.
성보의 일관성, 보안 취약성, 세션 관리 복잡성 등의 문제가 발생할 수 있으며, 실제로 세션 관리 때문에 애를 먹은 경험이 있습니다.
따라서 해당 방식은 폐기하고, supabase auth 공식 문서에 적혀 있는대로 사용자 정보를 getUser()로 가져오는 방식을 사용하는 것이 좋습니다.
다만 기록을 위해 코드 자체는 남겨두기로 했습니다.*/
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
