// contexts/UserContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getUser } from "@/actions/auth";
import { set, z } from "zod";

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
}> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();

      setUser(user);
    };
    fetchUser();
  }, []);

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