import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Loader from '../Loader';
import './Post.css';

const DisplayPost = () => {
    const [ post, setPost ] = useState(null);
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { id } = useParams();
    console.log(post)
    const getPost = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/posts/single/${id}`);
            setPost(data.post)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPost();
    }, [id]);

    return (
        <>
            {
                isLoading ? <Loader/> : <div className='post-page'>
                    <h1>{post?.title}</h1>
                    <time className='time'>{post?.createdAt}</time>
                    <div className='author'>by @{post?.author?.username}</div>
                    <div className='image'>
                        <img src='https://e1.pxfuel.com/desktop-wallpaper/680/644/desktop-wallpaper-rudra-shiva-lord-shiva-painting-lord-pinterest-de-adiyogi-shiva.jpg' alt='Shiva' />
                    </div>                    
                    <div className='content' dangerouslySetInnerHTML={{__html: post?.content}} />
                </div>
            }
        </>
    )
}

export default DisplayPost