import { LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom";
import PostListItem from "../components/PostListItem";
import { PostsResponse } from "../types";
import Paginator from "../components/Paginator";

export async function loader(args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const page = url.searchParams.get('page') || 1;

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts?page=' + page, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const posts = await response.json();

    return posts;
}

const Index = () => {
    const { posts, currentPage, totalPages } = useLoaderData() as PostsResponse;
    const [_, setSearchParams] = useSearchParams();

    return (
        <>
            <div>
                {posts.map(post => (<PostListItem post={post} />))}
            </div>
            <Paginator
                setPage={(page) => setSearchParams({ page: page.toString() })}
                currentPage={currentPage}
                totalPages={totalPages} />
        </>
    )
}

export default Index;