import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

import type { ApiError, ApiResponse } from "@/types/api";
import type { Post } from "@/types/community";

/* =========================
 * 게시글 목록 조회 (페이징)
 * ========================= */

interface PostPagedResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
  number: number; // current page
}

interface PostPagedParams {
  page: number;
  size: number;
}

export const usePostPaged = ({ page, size }: PostPagedParams, enabled = true) => {
  return useQuery<ApiResponse<PostPagedResponse>, ApiError>({
    queryKey: ["posts", "paged", page, size],

    queryFn: () =>
      apiClient<ApiResponse<PostPagedResponse>>(
        `${API.COMMUNITY.POSTS_PAGED}?page=${page}&size=${size}&createdAt,desc`,
        { method: "GET" },
      ),

    enabled,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

/* =========================
 * 게시글 상세 조회
 * ========================= */
export const usePostDetail = (postId: number, enabled = true) => {
  return useQuery<ApiResponse<Post>, ApiError>({
    queryKey: ["post", postId],

    queryFn: () =>
      apiClient<ApiResponse<Post>>(`${API.COMMUNITY.POSTS}/${postId}`, {
        method: "GET",
      }),

    enabled: enabled && !!postId,

    staleTime: 0,
    gcTime: 1000 * 60 * 10,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

/* =========================
 * 게시글 작성
 * ========================= */
interface CreatePostPayload {
  title: string;
  content: string;
}

export const useCreatePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Post>, ApiError, CreatePostPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<Post>>(API.COMMUNITY.POSTS, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: (res) => {
      // 목록 캐시 무효화 (첫 페이지 기준)
      queryClient.invalidateQueries({
        queryKey: ["posts", "paged"],
      });

      router.push(`/posts/${res.data.id}`);
    },

    onError: (err) => {
      toast.error("게시글 작성 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },
  });
};

/* =========================
 * 게시글 수정
 * ========================= */
interface UpdatePostPayload {
  postId: number;
  title: string;
  content: string;
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Post>, ApiError, UpdatePostPayload>({
    mutationFn: ({ postId, ...payload }) =>
      apiClient<ApiResponse<Post>>(`${API.COMMUNITY.POSTS}/${postId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
    },

    onError: (err) => {
      toast.error("게시글 수정 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },
  });
};

/* =========================
 * 게시글 삭제
 * ========================= */
export const useDeletePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, number>({
    mutationFn: (postId) =>
      apiClient<ApiResponse<null>>(`${API.COMMUNITY.POSTS}/${postId}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "paged"],
      });

      router.push("/posts");
    },

    onError: (err) => {
      toast.error("게시글 삭제 실패", {
        description: err.message ?? "다시 시도해주세요.",
      });
    },
  });
};
