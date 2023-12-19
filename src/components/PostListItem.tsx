import { Link } from 'react-router-dom';
import { Post } from '../types';
import classes from './PostListItem.module.css';
import VoteComponent from './Vote';

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <div className={classes.post}>
      <VoteComponent post={post} />
      <div className={classes.postInfo}>
        { post.link ? (
          <Link to={post.link}>
            <h2>{post.title}<span className={classes.postUrl}>({post.link})</span></h2>
          </Link>
        ) : (
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
        )}
        <p>by {post.author.userName}</p>
        { post.link && (
          <span><Link to={`/posts/${post._id}`}>Show post</Link></span>
        )}
      </div>
    </div>
  )
}

export default PostListItem;