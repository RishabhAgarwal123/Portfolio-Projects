import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Post.css';
import { customFormats, customModules } from '../utils/Custom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../UserContext';
import Loader from '../Loader';

const EditPost = () => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    // const [imagePreview, setImagePreview] = useState('');
    // const [file, setFile] = useState('');
    const navigate = useNavigate();

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

    const editPost = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);

        setIsLoading(true);
        try {
            const { data } = await axios.put(`http://localhost:4000/api/posts/edit/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json', // Set the correct content type for FormData
                },
            });

            if (data.success) {
                navigate('/');
                toast.success(data.message);
            } else toast.error(data.message);
            setIsLoading(false);
        } catch (error) {
            toast.error('Something went wrong!');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setTitle(post?.title);
        setSummary(post?.summary);
        setContent(post?.content)
    }, [post]);

    useEffect(() => {
        getPost();
    }, [id]);

    return (
        <>
            {isLoading ? <Loader /> : <form className='form-post' onSubmit={editPost}>
                <input
                    type='text'
                    className='input'
                    placeholder='Title'
                    name='title'
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)} />
                <input
                    type='text'
                    className='input'
                    placeholder='Summary'
                    name='summary'
                    value={summary || ''}
                    onChange={(e) => setSummary(e.target.value)} />
                <ReactQuill
                    theme='snow'
                    modules={customModules}
                    formats={customFormats}
                    value={content}
                    onChange={newValue => setContent(newValue)} />
                <button className='submit' style={{ marginTop: '20px' }}> Edit Post</button>
            </form>}
        </>
    )
}

export default EditPost