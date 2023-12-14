import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import PostListItem from "../components/PostListItem";

export const loader = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
        headers: {
            'Accepts': 'application/json'
        }
    })

    return await response.json()
}
/*
return {
    posts: await response.json()
}
*/
const Index = () => {
    const data = useLoaderData() as { posts: Post[], totalPages: number } | undefined

    return (
        <div>
            {data?.posts.map(post => <PostListItem post={post} key={post._id}/>)}
            <p>Pages: {data?.totalPages}</p>
        </div>
    )
}

export default Index;