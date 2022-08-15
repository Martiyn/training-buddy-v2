import React from "react";
import "./App.css";
import { Comment } from "./comments-model";
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
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }

  handleCommentStatusUpdate(comment: Comment) {
    this.setState(({ comments }) => ({
      comments: comments.map((c) => (c.id === comment.id ? comment : c)),
    }));
  }

  handleCommentEdit(comment: Comment) {}

  handleCommentDelete(comment: Comment) {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React Comments Homework</h2>
          <CommentsList
            comments={this.state.comments}
            filter={this.state.filter}
            onUpdateCommentStatus={this.handleCommentStatusUpdate}
            onEditComment={this.handleCommentEdit}
            onDeleteComment={this.handleCommentDelete}
          />
        </header>
      </div>
    );
  }
}
