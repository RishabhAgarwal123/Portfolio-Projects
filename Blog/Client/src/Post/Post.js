import React from 'react'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Post = (props) => {
  const { _id, title, summary, image, author, createdAt } = props.post;

  return (
    <>
      <div className='post'>
        <div className='image'>
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:4000/${image}`} alt={title} />
          </Link>
        </div>
        <div className='post-text'>
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className='info'>
            <a className='author' href='/'>{author?.username}</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
    </>
  )
}

export default Post