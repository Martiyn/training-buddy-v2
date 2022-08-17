import React from "react";
import { CommentListener } from "./shared-types";
import { Comment } from "./comments-model";
import { MOCK_COMMENTS } from "./mock-comments";

interface CommentInputProps {
  comment: Comment;
  onCommentCreate: CommentListener;
  onEditComment: CommentListener;
}

interface CommentInputState {
  title: string;
  content: string;
}

export class CommentInput extends React.Component<
  CommentInputProps,
  CommentInputState
> {
  state: Readonly<CommentInputState> = {
    title: '',
    content: '',
  };

  handleFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    this.setState({
      [fieldName]: event.target.value,
    } as unknown as CommentInputState);
  };

  handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onCommentCreate(
      new Comment(this.state.title, this.state.content, new Date(), new Date())
    );
    this.setState({ title: "", content: "" });
  };

  handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    const comment = this.props.comment
    this.props.onEditComment({...comment, title: this.state.title, content: this.state.content, lastModifiedAt: new Date()});
    this.setState({ title: "", content: "" });
  };

  render() {
    return (
      <form className="CommentInput">
        <input
          type="text"
          id="text"
          maxLength={80}
          name="title"
          value={this.state.title}
          onChange={this.handleFieldChanged}
        />
        <input
          type="text"
          id="text"
          maxLength={512}
          name="content"
          value={this.state.content}
          onChange={this.handleFieldChanged}
        />
        <button
          className="CommentInput-submit"
          onClick={this.handleCreate}
          type="submit"
        >
          Submit
        </button>
        <button
          className="CommentInput-submit"
          onClick={this.handleEdit}
          type="submit"
        >
          Edit
        </button>
      </form>
    );
  }
}
