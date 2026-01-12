"use client";

import { Comment } from "@/types/community";
import CommentItem from "./CommentItem";

interface Props {
  postId: number;
  comments: Comment[];
  onCreateReply: (parentId: number, reply: Comment) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentList({ postId, comments, onCreateReply, onDelete }: Props) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          postId={postId}
          onCreateReply={onCreateReply}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
