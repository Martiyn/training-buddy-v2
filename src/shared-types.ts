import { Comment } from "./comments-model";

export interface CommentListener {
    (comment: Comment): void;
}

export interface CommentListenerForMultiple {
    (comment: Comment[]): void;
}