import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import classes from "./CreatePost.module.css";
import { ActionData } from "../types";
import auth from "../lib/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const postData = Object.fromEntries(formData.entries());

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    return redirect('/')
}

const CreatePost = () => {
    const error = useActionData() as ActionData;

    return (
        <div className={classes.createPostForm}>
            <h2>Create post</h2>
            <Form method="post">
                {error && <p><b>Error:</b> {error.message}</p>}

                <div className={classes.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="link">Link (optional)</label>
                    <input type="text" name="link" id="link" />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="body">Body (optional)</label>
                    <textarea name="body" id="body" />
                </div>
                <div>
                    <button type="submit">Create post</button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePost;