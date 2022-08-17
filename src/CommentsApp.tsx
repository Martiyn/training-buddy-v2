import React from "react";
import "./App.css";
import { CommentInput } from "./CommentInput";
import { Comment } from "./comments-model";
import { CommentsFilter, FilterType } from "./CommentsFilter";
import CommentsList, { CommentFilter } from "./CommentsList";
import { MOCK_COMMENTS } from "./mock-comments";

export interface CommentAppState {
  comments: Comment[];
  filter: CommentFilter;
}

export default class App extends React.Component<{}, CommentAppState> {
  state: Readonly<CommentAppState> = {
    comments: MOCK_COMMENTS,
    filter: undefined,
  };

  constructor(props: {}) {
    super(props);
    this.handleCommentStatusUpdate = this.handleCommentStatusUpdate.bind(this);
    this.handleCommentCreate = this.handleCommentCreate.bind(this);
    this.handleCommentSelectedForEditing =
      this.handleCommentSelectedForEditing.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }

  handleCommentStatusUpdate(comment: Comment) {
    this.setState(({ comments }) => ({
      comments: comments
        .map((c) => (c.id === comment.id ? comment : c))
        .sort(function (a, b) {
          return (
            Number(new Date(b.lastModifiedAt)) -
            Number(new Date(a.lastModifiedAt))
          );
        }),
    }));
  }

  handleCommentCreate(comment: Comment) {
    this.setState(({ comments }) => ({
      comments: comments.concat(comment).sort(function (a, b) {
        return (
          Number(new Date(b.lastModifiedAt)) -
          Number(new Date(a.lastModifiedAt))
        );
      }),
    }));
  }

  handleCommentSelectedForEditing(comment: Comment) {
    this.setState(({ comments }) => ({
      comments: comments.filter((c) => c.id === comment.id),
    }));
  }
  handleCommentEdit(comment: Comment) {
    this.setState(({ comments }) => ({
      comments: comments
        .map((c) => (c.id === comment.id ? comment : c))
        .sort(function (a, b) {
          return (
            Number(new Date(b.lastModifiedAt)) -
            Number(new Date(a.lastModifiedAt))
          );
        }),
    }));
  }

  handleCommentDelete(comment: Comment) {
    this.setState(({ comments }) => ({
      comments: comments
        .filter((c) => c.id !== comment.id)
        .sort(function (a, b) {
          return (
            Number(new Date(b.lastModifiedAt)) -
            Number(new Date(a.lastModifiedAt))
          );
        }),
    }));
  }

  handleFilterChange = (filter: FilterType) => {
    this.setState({ filter: filter });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React Comments Homework</h2>
          <CommentInput
            onCommentCreate={this.handleCommentCreate}
            onCommentEdit={this.handleCommentEdit}
          />
          <CommentsFilter
            filter={this.state.filter}
            onFilterChange={this.handleFilterChange}
          />
          <CommentsList
            comments={this.state.comments}
            filter={this.state.filter}
            onUpdateCommentStatus={this.handleCommentStatusUpdate}
            onEditComment={this.handleCommentSelectedForEditing}
            onDeleteComment={this.handleCommentDelete}
          />
        </header>
      </div>
    );
  }
}
