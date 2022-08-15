import React from "react";
import { CommentListener } from "./shared-types";
import { Comment, CommentStatus } from "./comments-model";
import "./CommentItem.css";

interface CommentItemProps {
  comment: Comment;
  onUpdateCommentStatus: CommentListener;
  onEditComment: CommentListener;
  onDeleteComment: CommentListener;
}

export const CommentItem = ({ comment, ...rest }: CommentItemProps) => {
  function handleCommentStatusSuspend(event: React.MouseEvent) {
    rest.onUpdateCommentStatus({ ...comment, status: 2 });
  }

  function handleCommentStatusActivate(event: React.MouseEvent) {
    rest.onUpdateCommentStatus({ ...comment, status: 1 });
  }

  function handleCommentDelete(event: React.MouseEvent) {
    rest.onDeleteComment(comment);
  }
  return (
    <div className="CommentItem">
      <span className="CommentItem-id">{comment.id}</span>
      <span className="CommentItem-text">
        <span className="CommentItem-title">{comment.title}</span>
        <span className="CommentItem-content">{comment.content}</span>
      </span>
      <span className="CommentItem-status">
        {CommentStatus[comment.status]}
      </span>
      {comment.status === CommentStatus.Active ? (
        <span
          className="CommentItem-button"
          onClick={handleCommentStatusSuspend}
        >
          Suspend
        </span>
      ) : (
        <span
          className="CommentItem-button"
          onClick={handleCommentStatusActivate}
        >
          Activate
        </span>
      )}
    </div>
  );
};
