import React from "react";
import { CommentItem } from "./CommentItem";
import { Comment, CommentStatus } from "./comments-model";
import { CommentListener } from "./shared-types";

export type CommentFilter = CommentStatus | undefined;

interface CommentItemProps {
  comments: Comment[];
  filter: CommentFilter;
  onUpdateCommentStatus: CommentListener;
  onEditComment: CommentListener;
  onDeleteComment: CommentListener;
}

export default function CommentsList({
  comments,
  filter,
  ...rest
}: CommentItemProps) {
  return (
    <div className="CommentsList">
      {comments
        .filter((comment) => (!filter ? true : comment.status === filter))
        .map((comment) => (
          <CommentItem comment={comment} key={comment.id} {...rest} />
        ))}
    </div>
  );
}
