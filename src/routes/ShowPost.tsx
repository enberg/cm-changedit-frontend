import { Link, LoaderFunctionArgs, useFetcher, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import classes from './ShowPost.module.css';
import CommentForm from "../components/CommentForm";
import CommentComponent from "../components/Comment";
import VoteComponent from "../components/Vote";

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

const ShowPost = () => {
  const post = useLoaderData() as Post;

  return (
    <>
      <div className={classes.post}>
        <VoteComponent post={post} />
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
      <CommentForm postId={post._id} />
      { post.comments?.map(comment => <CommentComponent key={comment._id} comment={comment} />) }
    </>
  );
}

export default ShowPost;