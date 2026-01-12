"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { Comment } from "@/types/community";
import CommentForm from "./CommentForm";
import { safeTimeAgo } from "@/utils/time";
import { useOverlay } from "@/hooks/useOverlay";

import ActionModal from "@/components/overlay/modal/ActionModal";
import DeleteConfirmModal from "@/components/overlay/modal/DeleteConfirmModal";

import { useUpdateComment, useDeleteComment } from "@/hooks/query/useComment";

interface Props {
  comment: Comment;
  postId: number;
  onCreateReply: (parentId: number, reply: Comment) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentItem({ comment, postId, onCreateReply, onDelete }: Props) {
  const [isReplying, setIsReplying] = useState(false);

  // 수정 상태
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const { openOverlay } = useOverlay();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const children = comment.children ?? [];

  /* =====================
   * 수정
   * ===================== */
  const startEdit = (target: Comment) => {
    setEditingId(target.commentId);
    setEditingContent(target.content);
  };

  const submitEdit = async (commentId: number) => {
    if (!editingContent.trim()) return;

    await updateComment.mutateAsync({
      commentId,
      content: editingContent,
    });

    // 기존 로컬 반영 유지
    if (comment.commentId === commentId) {
      comment.content = editingContent;
    } else {
      comment.children =
        comment.children?.map((c) =>
          c.commentId === commentId ? { ...c, content: editingContent } : c,
        ) ?? [];
    }

    setEditingId(null);
    setEditingContent("");
  };

  /* =====================
   * 삭제 (핵심 수정 지점)
   * ===================== */
  const confirmDelete = (commentId: number) => {
    openOverlay(
      "modal",
      <DeleteConfirmModal
        title="댓글을 삭제할까요?"
        description="삭제한 댓글은 복구할 수 없습니다."
        onConfirm={async () => {
          await deleteComment.mutateAsync({ commentId });
          onDelete(commentId);
        }}
      />,
    );
  };

  /* =====================
   * 액션 모달
   * ===================== */
  const openActionModal = (target: Comment) => {
    openOverlay(
      "modal",
      <ActionModal
        onEdit={() => startEdit(target)}
        onDelete={() => confirmDelete(target.commentId)}
      />,
    );
  };

  return (
    <div className="border-b pb-2.5">
      {/* ===== 부모 댓글 ===== */}
      <div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-main-pink font-medium">{comment.writerNickname}</span>
          <span className="text-muted-foreground text-xs">· {safeTimeAgo(comment.createdAt)}</span>

          {comment.isMine && (
            <button
              onClick={() => openActionModal(comment)}
              className="ml-auto rounded p-1 text-gray-400 hover:bg-gray-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* 내용 / 수정 */}
        {editingId === comment.commentId ? (
          <div className="mt-1 space-y-1">
            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="w-full rounded-md border px-2 py-1 text-sm"
            />
            <div className="flex gap-2 text-xs">
              <button onClick={() => submitEdit(comment.commentId)} className="text-main-pink">
                저장
              </button>
              <button onClick={() => setEditingId(null)} className="text-muted-foreground">
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-0.5 text-sm">{comment.content}</div>
        )}

        <button
          onClick={() => setIsReplying((v) => !v)}
          className="text-muted-foreground/70 hover:text-muted-foreground mt-1 text-xs"
        >
          답글
        </button>
      </div>

      {/* ===== 대댓글 ===== */}
      {children.length > 0 && (
        <div className="mt-2.5 space-y-3 pl-4">
          {children.map((child) => (
            <div key={child.commentId}>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-main-pink font-medium">{child.writerNickname}</span>
                <span className="text-muted-foreground text-xs">
                  · {safeTimeAgo(child.createdAt)}
                </span>

                {child.isMine && (
                  <button
                    onClick={() => openActionModal(child)}
                    className="ml-auto rounded p-1 text-gray-400 hover:bg-gray-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                )}
              </div>

              {editingId === child.commentId ? (
                <div className="mt-1 space-y-1">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full rounded-md border px-2 py-1 text-sm"
                  />
                  <div className="flex gap-2 text-xs">
                    <button onClick={() => submitEdit(child.commentId)} className="text-main-pink">
                      저장
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-muted-foreground">
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground mt-0.5 text-sm">{child.content}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== 대댓글 입력 ===== */}
      {isReplying && (
        <div className="mt-2.5 pl-4">
          <CommentForm
            postId={postId}
            parentId={comment.commentId}
            onSuccess={(reply) => {
              onCreateReply(comment.commentId, reply);
              setIsReplying(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
