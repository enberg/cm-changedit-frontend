import { LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom";
import { Post } from "../types";
import PostListItem from "../components/PostListItem";
import Paginator from "../components/Paginator";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts?page=' + page, {
        headers: {
            'Accepts': 'application/json'
        }
    })

    const backendResponse = await response.json() as { posts: Post[], totalPages: number };

    return { page, ...backendResponse }
}

const Index = () => {
    const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div>
            {data?.posts.map(post => <PostListItem post={post} key={post._id}/>)}
            <Paginator 
                currentPage={data.page}
                totalPages={data?.totalPages} 
                setPage={(page) => setSearchParams({ ...searchParams, page: page.toString() })}
                />
        </div>
    )
}

export default Index;