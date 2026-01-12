"use client";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import { Post } from "@/types/community";
import { safeTimeAgo } from "@/utils/time";
import { useOverlay } from "@/hooks/useOverlay";

import ActionModal from "@/components/overlay/modal/ActionModal";
import DeleteConfirmModal from "@/components/overlay/modal/DeleteConfirmModal";
import { useDeletePost } from "@/hooks/query/usePost";

interface Props {
  post: Post;
}

export default function PostDetailCard({ post }: Props) {
  const router = useRouter();
  const { openOverlay } = useOverlay();
  const deletePost = useDeletePost();

  // 삭제
  const confirmDelete = () => {
    openOverlay(
      "modal",
      <DeleteConfirmModal
        title="게시글을 삭제할까요?"
        description="삭제한 게시글은 복구할 수 없습니다."
        onConfirm={async () => {
          await deletePost.mutateAsync(post.id);
          router.replace("/posts");
        }}
      />,
    );
  };

  // 모달
  const openActionModal = () => {
    openOverlay(
      "modal",
      <ActionModal onEdit={() => router.push(`/posts/${post.id}/edit`)} onDelete={confirmDelete} />,
    );
  };

  return (
    <article className="space-y-3 rounded-lg border bg-white p-4">
      {/* 헤더 */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-main-pink font-medium">{post.writerNickname}</span>
        <span className="text-muted-foreground text-xs">· {safeTimeAgo(post.createdAt)}</span>

        {post.isMine && (
          <button
            onClick={openActionModal}
            className="ml-auto rounded p-1 text-gray-400 hover:bg-gray-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 제목 */}
      <h1 className="text-lg font-semibold">{post.title}</h1>

      {/* 내용 */}
      <div className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
