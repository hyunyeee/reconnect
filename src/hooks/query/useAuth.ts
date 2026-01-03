"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import type { ApiError, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

import type { LoginFormData, MemberFormData } from "@/schemas/memberSchema";
import { authAtom } from "@/atoms/auth";
import { useSetAtom } from "jotai";

export const useSignup = () => {
  const router = useRouter();

  return useMutation<ApiResponse<null>, ApiError, MemberFormData>({
    mutationFn: async (payload) => {
      return await apiClient<ApiResponse<null>>(API.MEMBER.SIGNUP, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success("회원가입 완료", {
        description: "가입이 성공적으로 완료되었습니다.",
      });

      router.push("/login");
    },
    onError: (err) => {
      toast.error("회원가입 실패", {
        description: err.message ?? "회원가입 중 오류가 발생했습니다.",
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<null>, ApiError, LoginFormData>({
    mutationFn: async (payload) => {
      const serverPayload = {
        memberEmail: payload.email,
        memberPassword: payload.password,
      };

      return await apiClient<ApiResponse<null>>(API.MEMBER.LOGIN, {
        method: "POST",
        body: JSON.stringify(serverPayload),
      });
    },

    onSuccess: () => {
      setAuth({ isLoggedIn: true });

      toast.success("로그인 성공", {
        description: "반가워요!",
      });

      router.push("/");
    },

    onError: (err) => {
      toast.error("로그인 실패", {
        description: err.message ?? "아이디 또는 비밀번호를 확인해주세요.",
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<null>, ApiError, void>({
    mutationFn: async () => {
      return await apiClient<ApiResponse<null>>(API.MEMBER.LOGOUT, {
        method: "POST",
      });
    },

    onSuccess: () => {
      setAuth({ isLoggedIn: false });
      toast.success("로그아웃 되었습니다.");
      router.push("/login");
    },

    onError: (err) => {
      toast.error("로그아웃 실패", {
        description: err.message ?? "로그아웃 중 오류가 발생했습니다.",
      });
    },
  });
};
