import { Form, useActionData } from "react-router-dom";
import classes from "./CreatePost.module.css";
import { ActionData } from "../types";

const CreatePost = () => {
    const error = useActionData() as ActionData;

    return (
        <div className={classes.createPostForm}>
            <h2>Create post</h2>
            <Form method="post" encType="multipart/form-data">
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
                <div className={classes.formGroup}>
                    <label htmlFor="image">Image (optional)</label>
                    <input type="file" name="image" id="image" accept="image/*" />
                </div>
                <div>
                    <button type="submit">Create post</button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePost;