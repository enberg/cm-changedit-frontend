import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom"
import classes from './SignUp.module.css';
import auth from "../lib/auth";

export const action = async (args: ActionFunctionArgs) => {
    const { request } = args;

    const formData = await request.formData();

    const postData = Object.fromEntries(formData.entries());

    console.log(postData)
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.getJWT(),
        },
        method: 'POST',
        body: JSON.stringify(postData)
    })

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    return redirect('/');
}

const CreatePost = () => {
    const error = useActionData() as { message: string  } | undefined;
    return (
        <div className={classes.createPostForm}>
            <h2>Create a new post</h2>
            <Form method="post">
                { error && <p><b>Error:</b> {error.message}</p> }
  
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
                    <input type="text" name="body" id="body" />
                </div>
                <div>
                    <button type="submit">Create post</button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePost;