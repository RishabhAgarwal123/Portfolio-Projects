import React, { useContext, useEffect, useState } from 'react'
import Post from './Post/Post'
import { UserContext } from './UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Home = () => {
  const { authenticated, isLoading, setIsLoading } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const { data } = await axios.get('/posts/all');
      if (data.success) {
        const { posts } = data;
        setPosts(posts);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong!');
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (!authenticated) navigate('/');
    getPosts();
  }, [authenticated]);

  return (
    <>
    {
      isLoading ? <Loader /> : <>
        { posts.length !== 0 && posts.map((post) => {
          return <Post key={post._id} post={post} />} )}
      </>
    }
    </>
  )
}

export default Home