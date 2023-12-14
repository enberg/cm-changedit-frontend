export type ActionData = { message: string } | undefined;

export interface Post {
    _id: string;
    title: string;
    link?: string;
    body?: string;
    author: {
        _id: string;
        userName: string
    }
}
