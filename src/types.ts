export interface Comment {
    _id: string,
    body: string,
    author: { _id: string, userName: string},
}

export interface Post {
    _id: string,
    title: string,
    link?: string,
    body?: string,
    author: { _id: string, userName: string};
    comments?: Comment[],
}

export interface PostsResponse {
    posts: Post[],
    currentPage: number,
    totalPages: number
}