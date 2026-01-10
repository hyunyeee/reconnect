"use client";

import { usePostDetail } from "@/hooks/query/usePost";
import PostDetailCard from "@/components/post/PostDetailCard";
import CommentSection from "@/components/comment/CommentSection";
import { BackHeader } from "@/components/layout/BackHeader";
import { Post } from "@/types/community";

interface Props {
  postId: number;
}

export default function PostDetailClient({ postId }: Props) {
  const { data, isLoading, isError } = usePostDetail(postId);

  if (isLoading) {
    return <div className="py-10 text-center text-sm">불러오는 중...</div>;
  }

  if (isError || !data?.data) {
    return (
      <div className="py-10 text-center text-sm text-red-500">게시글을 불러올 수 없습니다.</div>
    );
  }

  const post: Post = data.data;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <BackHeader backHref="/posts" />
      <PostDetailCard post={post} />
      <CommentSection postId={post.id} />
    </div>
  );
}
