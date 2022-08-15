export enum CommentStatus {
    Active = 1, Suspended
}

export class Comment {
    static nextId = 0;
    id = ++Comment.nextId;

    constructor(
        public title: string,
        public content: string,
        public createdAt: Date,
        public lastModifiedAt: Date,
        public status = CommentStatus.Active
    ) { }
}