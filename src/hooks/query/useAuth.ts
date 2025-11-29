"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

import type { MemberFormData } from "@/schemas/memberSchema";
import type { LoginFormData } from "@/schemas/memberSchema";

export const useSignup = () => {
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
    },
    onError: (err) => {
      toast.error("회원가입 실패", {
        description: err.message ?? "회원가입 중 오류가 발생했습니다.",
      });
    },
  });
};

export const useLogin = () => {
  return useMutation<ApiResponse<null>, ApiError, LoginFormData>({
    mutationFn: async (payload) => {
      return await apiClient<ApiResponse<null>>(API.MEMBER.LOGIN, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success("로그인 성공", {
        description: "반가워요!",
      });
    },
    onError: (err) => {
      toast.error("로그인 실패", {
        description: err.message ?? "아이디 또는 비밀번호를 확인해주세요.",
      });
    },
  });
};

export const useLogout = () => {
  return useMutation<ApiResponse<null>, ApiError, void>({
    mutationFn: async () => {
      return await apiClient<ApiResponse<null>>(API.MEMBER.LOGOUT, {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast.success("로그아웃 되었습니다.");
    },
    onError: (err) => {
      toast.error("로그아웃 실패", {
        description: err.message ?? "로그아웃 중 오류가 발생했습니다.",
      });
    },
  });
};
