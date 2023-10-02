import React, { useContext, useEffect } from 'react'
import Post from './Post/Post'
import { UserContext } from './UserContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { authenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) navigate('/');
  }, [authenticated, navigate])

  return (
    <>
        <Post />
        <Post />
        <Post />
        <Post />
    </>
  )
}

export default Home