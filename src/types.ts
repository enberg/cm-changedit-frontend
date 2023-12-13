export interface Post {
    _id: string,
    title: string,
    link?: string,
    body?: string,
    author: { _id: string, userName: string}
}

export interface PostsResponse {
    posts: Post[],
    currentPage: number,
    totalPages: number
}