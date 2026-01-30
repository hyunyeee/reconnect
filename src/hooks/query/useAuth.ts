"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";

import type { ApiError, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

import type { LoginFormData, MemberSignUpPayload } from "@/schemas/memberSchema";
import type { MemberProfileResponse, MemberProfileUpdateForm } from "@/types/member";

import { authAtom, AuthUser } from "@/atoms/auth";

/* =========================
 * 회원가입
 * ========================= */
export const useSignup = () => {
  const router = useRouter();

  return useMutation<ApiResponse<null>, ApiError, MemberSignUpPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<null>>(API.MEMBER.SIGNUP, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

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

/* =========================
 * 로그인
 * ========================= */
export const useLogin = () => {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<AuthUser>, ApiError, LoginFormData>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<AuthUser>>(API.MEMBER.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          memberEmail: payload.email,
          memberPassword: payload.password,
        }),
      }),

    onSuccess: (res) => {
      setAuth({
        isLoggedIn: true,
        user: res.data,
      });

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

/* =========================
 * 로그아웃
 * ========================= */
export const useLogout = () => {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<null>, ApiError, void>({
    mutationFn: () =>
      apiClient<ApiResponse<null>>(API.MEMBER.LOGOUT, {
        method: "POST",
      }),

    onSuccess: () => {
      setAuth({
        isLoggedIn: false,
        user: null,
      });

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

/* =========================
 * 내 정보 조회
 * ========================= */

export const useMemberProfile = () => {
  return useQuery<ApiResponse<MemberProfileResponse>, ApiError, MemberProfileResponse>({
    queryKey: ["memberProfile"],
    queryFn: () =>
      apiClient<ApiResponse<MemberProfileResponse>>(API.MEMBER.PROFILE, {
        method: "GET",
      }),

    select: (res) => res.data,

    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};

/* =========================
 * 내 정보 수정
 * ========================= */
export const useUpdateMemberProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, MemberProfileUpdateForm>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<null>>(API.MEMBER.PROFILE, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["memberProfile"],
      });

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

/* =========================
 * 틱톡 아이디 등록
 * ========================= */
interface AddTiktokIdPayload {
  tiktokId: string;
}

export const useAddTiktokId = () => {
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<void>, ApiError, AddTiktokIdPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<void>>(API.MEMBER.ADD_TIKTOK_ID, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: (_, variables) => {
      const { tiktokId } = variables;

      setAuth((prev) => ({
        ...prev,
        user: prev.user
          ? {
              ...prev.user,
              tiktokId,
            }
          : prev.user,
      }));

      toast.success("틱톡 아이디가 등록되었습니다.");
    },

    onError: (err) => {
      toast.error("틱톡 아이디 등록 실패", {
        description: err.message ?? "요청 중 오류가 발생했습니다.",
      });
    },
  });
};

/* =========================
 * 비밀번호 재설정
 * ========================= */
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation<
    ApiResponse<null>,
    ApiError,
    {
      phoneNumber: string;
      newPassword: string;
    }
  >({
    mutationFn: (payload) =>
      apiClient<ApiResponse<null>>(API.MEMBER.RESET_PASSWORD, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      toast.success("비밀번호 변경 완료", {
        description: "새 비밀번호로 로그인해주세요.",
      });
      router.push("/login");
    },

    onError: (err) => {
      toast.error("비밀번호 변경 실패", {
        description: err.message ?? "처리 중 오류가 발생했습니다.",
      });
    },
  });
};
