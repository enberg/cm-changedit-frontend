import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import classes from './Post.module.css';

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const posts = await response.json();

  return posts;
};

const PostRoute = () => {
  const post = useLoaderData() as Post;

  return (
    <>
      <div className={classes.post}>
        <div className={classes.postInfo}>
          { post.link ? (
            <Link to={post.link}>
              <h2>{post.title}<span className={classes.postUrl}>({post.link})</span></h2>
            </Link>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.userName}</p>
          { post.body && (
            <div className={classes.postBody}>
              <p>{post.body}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PostRoute;