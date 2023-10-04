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
      const { data } = await axios.get('/post/all');
      if (data.success) {
        const { posts } = data;
        setPosts(posts);
        toast.success('Post Created Successfully');
      }
      setIsLoading(false);
      toast.error('Post not created!');
    } catch (error) {
      toast.error('Something went wrong!');
      setIsLoading(false);
    }
  }

  getPosts();

  useEffect(() => {
    if (!authenticated) navigate('/');
  }, [authenticated, navigate]);

  return (
    <>
    {
      isLoading ? <Loader /> : <>
        { posts.length !== 0 && posts.map((post) => <Post key={post._id} post={post} /> )}
      </>
    }
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  )
}

export default Home