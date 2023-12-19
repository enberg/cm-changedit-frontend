import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { useRef } from "react";
import classes from './CommentForm.module.css';
import auth from "../lib/auth";
import { Post } from "../types";

export const action = async (args: ActionFunctionArgs) => {
    const { postId } = args.params;
    const formData = await args.request.formData();

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + postId +'/comments', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        method: 'POST',
        body: JSON.stringify({ commentBody: formData.get('body') })
    });

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    const post = await response.json() as Post;

    return {
        comments: post.comments
    }
}

const CommentForm = ({ postId }: { postId: string }) => {
    const fetcher = useFetcher({ key: 'comment-form-' + postId })
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    if (fetcher.data && textareaRef.current) {
        textareaRef.current.value = '';
    }

    return (
        <div className={classes.commentForm}>
            <h3>Leave a comment</h3>
            <fetcher.Form method="post" action={`/posts/${postId}/comments`}>
                <div className={classes.formGroup}>
                    <textarea ref={textareaRef} name="body" id="body" required></textarea>
                </div>
                <div className={classes.formGroup}>
                    <button type="submit">Post comment</button>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default CommentForm;