import { ActionFunctionArgs, useFetcher } from 'react-router-dom';
import classes from './CommentForm.module.css';
import auth from '../lib/auth';
import { Post } from '../types';

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params;
  const formData = await args.request.formData();

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + postId + '/comments', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth.getJWT(),
    },
    method: 'POST',
    body: JSON.stringify({ commentBody: formData.get('comment') }),
  });

  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }

  const post = await response.json() as Post;

  return {
    comments: post.comments,
  }
}

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({postId}: CommentFormProps) => {
  const fetcher = useFetcher({key: 'comment-form-' + postId});

  const data = fetcher.data as { message?: string } | undefined;

  return (
    <div className={classes.commentForm}>
      <h3>Leave a Comment</h3>
      {data?.message && <p><b>Failed to post comment:</b> {data.message}</p>}
      <fetcher.Form method="post" action={`/posts/${postId}/comments`}>
        <div className={classes.formGroup}>
          <textarea id="comment" name="comment" required></textarea>
        </div>
        <div className={classes.formGroup}>
          <button type="submit">Post Comment</button>
        </div>
      </fetcher.Form>
    </div>
  )
}

export default CommentForm;