import React from "react";
import { CommentListener } from "./shared-types";
import { Comment, CommentStatus } from "./comments-model";
import { CommentInput } from "./CommentInput";
import "./CommentItem.css";

interface CommentItemProps {
  comment: Comment;
  onUpdateCommentStatus: CommentListener;
  onEditComment: CommentListener;
  onDeleteComment: CommentListener;
}

export const CommentItem = ({ comment, ...rest }: CommentItemProps) => {
  function handleCommentStatusSuspend() {
    rest.onUpdateCommentStatus({
      ...comment,
      status: 2,
      lastModifiedAt: new Date(),
    });
  }

  function handleCommentStatusActivate() {
    rest.onUpdateCommentStatus({
      ...comment,
      status: 1,
      lastModifiedAt: new Date(),
    });
  }

  function handleCommentEdit() {
    rest.onEditComment(comment);
  }

  function handleCommentDelete() {
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
      <div className="CommentItem-status-buttons">
        <label>
          <input
            type="radio"
            onClick={handleCommentStatusSuspend}
            checked={comment.status === CommentStatus.Suspended ? true : false}
            readOnly={true}
          />
          Suspended
        </label>
        <label>
          <input
            type="radio"
            onClick={handleCommentStatusActivate}
            checked={comment.status === CommentStatus.Active ? true : false}
            readOnly={true}
          />
          Active
        </label>
      </div>
      <div className="CommentItem-edit-delete-buttons">
        <span className="CommentItem-edit-btn" onClick={handleCommentEdit}>
          Edit
        </span>
        <span className="CommentItem-delete-btn" onClick={handleCommentDelete}>
          Delete
        </span>
      </div>
      <div className="CommentItem-dates">
        <span className="CommentItem-created-at">
          <span>Created on:</span> <span>{comment.createdAt.toISOString()}</span>
        </span>
        <span className="CommentItem-status-last-modified-at">
          <span>Last modified on:</span>{" "}
          <span>{comment.lastModifiedAt.toISOString()}</span>
        </span>
      </div>
    </div>
  );
};
