// contexts/UserContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { z } from "zod";

const zUser = z.nullable(
  z.object({
    id: z.string(),
    email: z.string().optional(),
  }),
);
type UserType = z.infer<typeof zUser>;

const zUserContext = z.object({
  user: zUser,
  setUser: z.function().args(zUser).returns(z.void()),
});
type UserContextType = z.infer<typeof zUserContext>;

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  children: ReactNode;
  initialUser: UserType | null;
}> = ({ children, initialUser }) => {
  const [user, setUser] = useState<UserType | null>(initialUser);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await getUser();
  //       if (user) {
  //         setUser({
  //           id: user.id,
  //           email: user.email,
  //         });
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       setUser(null);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
