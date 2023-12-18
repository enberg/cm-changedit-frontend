import { Form, useLocation, useNavigation } from 'react-router-dom';
import classes from './Vote.module.css'
import { Post } from '../types';

const VoteComponent = ({post}: {post: Post}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = location.pathname + '?' + searchParams.toString();

  return (
      <div className={classes.vote}>
        <Form method="post" action={`/posts/${post._id}/vote`}>
          <input type="hidden" name="from" value={returnTo} />
          <input type="hidden" name="vote" value="up" />
          <button type="submit">↑</button>
        </Form>
        <span>{post.score || 0}</span>
        <Form method="post" action={`/posts/${post._id}/vote`}>
          <input type="hidden" name="from" value={returnTo} />
          <input type="hidden" name="vote" value="down" />
          <button type="submit">↓</button>
        </Form>
      </div>
  )
}

export default VoteComponent;