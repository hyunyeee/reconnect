import { atom } from "jotai";

export interface AuthUser {
  memberId: number;
  memberName: string;
  memberNickName: string;
  tiktokId: string | null;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
}

export const authAtom = atom<AuthState>({
  isLoggedIn: false,
  user: null,
});
