import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { ApiError, ApiResponse } from "@/types/api";
import type { AttachmentAnswer, AttachmentQuestion, AttachmentResult } from "@/types/attachment";

/* 질문 조회 */
export const useAttachmentQuestions = (enabled = true) => {
  return useQuery<ApiResponse<AttachmentQuestion[]>, ApiError>({
    queryKey: ["attachment-questions"],
    queryFn: () =>
      apiClient<ApiResponse<AttachmentQuestion[]>>(API.ATTACHMENT.QUESTIONS, {
        method: "GET",
      }),

    enabled,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

/* 답변 제출 */
type AttachmentSubmitPayload = {
  answers: AttachmentAnswer[];
};

export const useAttachmentSubmit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, AttachmentSubmitPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<null>>(API.ATTACHMENT.SUBMIT, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      // 이전 결과 캐시 제거
      queryClient.invalidateQueries({
        queryKey: ["attachment-result"],
      });

      router.push("/attachment-test/result");
    },

    onError: (err) => {
      toast.error("제출 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },
  });
};

/* 결과 조회 */
export const useAttachmentResult = () => {
  return useQuery<ApiResponse<AttachmentResult[]>, ApiError>({
    queryKey: ["attachment-result"],

    queryFn: () =>
      apiClient<ApiResponse<AttachmentResult[]>>(API.ATTACHMENT.RESULT, {
        method: "GET",
      }),

    staleTime: 0, // 항상 최신
    gcTime: 1000 * 60 * 10,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
