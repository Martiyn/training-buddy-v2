import React from "react";
import { CommentItem } from "./CommentItem";
import { Comment, CommentStatus } from "./comments-model";
import { CommentListener, CommentListenerForMultiple } from "./shared-types";
import "./CommentsList.css";

export type CommentFilter = CommentStatus | undefined;

interface CommentItemProps {
  comments: Comment[];
  filter: CommentFilter;
  onUpdateCommentStatus: CommentListener;
  onEditComment: CommentListener;
  onDeleteComment: CommentListener;
  onFilterCommentsByStatus: CommentListenerForMultiple;
}

export default function CommentsList({
  comments,
  filter,
  ...rest
}: CommentItemProps) {
  function handleCommentFilterActive() {
    rest.onFilterCommentsByStatus(
      comments.filter((comment) => comment.status === CommentStatus.Active)
    );
  }

  function handleCommentFilterSuspended() {
    rest.onFilterCommentsByStatus(
      comments.filter((comment) => comment.status === CommentStatus.Suspended)
    );
  }

  return (
    <div className="CommentsList">
      <div className="CommentsList-filter-buttons">
        <span
          className="CommentsList-active-filter-btn"
          onClick={handleCommentFilterActive}
        >
          Filter Active
        </span>
        <span
          className="CommentsList-suspended-filter-btn"
          onClick={handleCommentFilterSuspended}
        >
          Filter Suspended
        </span>
      </div>
      {comments
        .filter((comment) => (!filter ? true : comment.status === filter))
        .map((comment) => (
          <CommentItem comment={comment} key={comment.id} {...rest} />
        ))}
    </div>
  );
}
