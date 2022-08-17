import { Comment } from "./comments-model";
import { FilterType } from "./CommentsFilter";

export interface CommentListener {
    (comment: Comment): void;
}

export interface FilterListener {
    (filter: FilterType): void;
}