"use client";

import { useEffect, useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LoadPrevCommentsButton from "./LoadPrevCommentsButton";

import { Comment } from "@/types/community";
import {
  useCommentsFirstLoad,
  useLoadPrevComments,
  useCreateComment,
} from "@/hooks/query/useComment";

interface Props {
  postId: number;
}

const PAGE_SIZE = 5;

export default function CommentSection({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const firstLoad = useCommentsFirstLoad({
    postId,
    size: PAGE_SIZE,
  });

  useEffect(() => {
    if (!firstLoad.comments.length) return;
    if (currentPage !== null) return;

    setComments(firstLoad.comments);
    setCurrentPage(firstLoad.currentPage);
    setTotalPages(firstLoad.totalPages);
    setTotalCount(firstLoad.totalElements);
  }, [firstLoad, currentPage]);

  const nextPage = currentPage !== null && currentPage + 1 < totalPages ? currentPage + 1 : null;

  const prevCommentsQuery = useLoadPrevComments({
    postId,
    page: nextPage ?? 0,
    size: PAGE_SIZE,
    enabled: nextPage !== null,
  });

  const handleLoadPrev = () => {
    if (!prevCommentsQuery.data || nextPage === null) return;

    const newComments = prevCommentsQuery.data.data.content;
    setComments((prev) => [...newComments, ...prev]);
    setCurrentPage(nextPage);
  };

  const createComment = useCreateComment();

  const handleCreateRoot = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
    setTotalCount((c) => c + 1);
  };

  const handleCreateReply = (parentId: number, reply: Comment) => {
    setComments((prev) =>
      prev.map((c) =>
        c.commentId === parentId ? { ...c, children: [...(c.children ?? []), reply] } : c,
      ),
    );
  };

  /** 삭제 처리 (부모 / 대댓글 공통) */
  const handleDelete = (commentId: number) => {
    setComments((prev) =>
      prev
        // 부모 댓글 삭제
        .filter((c) => c.commentId !== commentId)
        // 대댓글 삭제
        .map((c) => ({
          ...c,
          children: c.children?.filter((child) => child.commentId !== commentId) ?? [],
        })),
    );
    setTotalCount((c) => c - 1);
  };

  return (
    <div className="mt-8 space-y-6">
      <CommentHeader total={totalCount} />

      {nextPage !== null && (
        <LoadPrevCommentsButton onClick={handleLoadPrev} loading={prevCommentsQuery.isFetching} />
      )}

      <CommentList
        comments={comments}
        postId={postId}
        onCreateReply={handleCreateReply}
        onDelete={handleDelete}
      />

      <CommentForm
        postId={postId}
        onSuccess={handleCreateRoot}
        isLoading={createComment.isPending}
      />
    </div>
  );
}
