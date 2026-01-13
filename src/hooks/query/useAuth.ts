"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import type { ApiError, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

import type { LoginFormData, MemberFormData } from "@/schemas/memberSchema";
import type { MemberProfileResponse, MemberProfileUpdateForm } from "@/types/member";

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
      toast.success("로그인 성공", { description: "반가워요!" });
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

export const useMemberProfile = () => {
  return useQuery<ApiResponse<MemberProfileResponse>, ApiError, MemberProfileResponse>({
    queryKey: ["memberProfile"],
    queryFn: async () => {
      return await apiClient<ApiResponse<MemberProfileResponse>>(API.MEMBER.PROFILE, {
        method: "GET",
      });
    },
    select: (res) => res.data,
  });
};

export const useUpdateMemberProfile = () => {
  const router = useRouter();
  return useMutation<ApiResponse<null>, ApiError, MemberProfileUpdateForm>({
    mutationFn: async (payload) => {
      return await apiClient<ApiResponse<null>>(API.MEMBER.PROFILE, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success("내 정보가 수정되었습니다.");
      router.push("/");
    },
    onError: (err) => {
      toast.error("수정 실패", {
        description: err.message ?? "정보 수정 중 오류가 발생했습니다.",
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation<
    ApiResponse<null>,
    ApiError,
    {
      phoneNumber: string;
      newPassword: string;
    }
  >({
    mutationFn: async (payload) => {
      return await apiClient<ApiResponse<null>>(API.MEMBER.RESET_PASSWORD, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      toast.success("비밀번호 변경 완료", {
        description: "새 비밀번호로 로그인해주세요.",
      });
    },
    onError: (err) => {
      toast.error("비밀번호 변경 실패", {
        description: err.message ?? "처리 중 오류가 발생했습니다.",
      });
    },
  });
};
