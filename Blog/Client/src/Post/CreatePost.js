import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Post.css';
import { customFormats, customModules } from '../utils/Custom';

const CreatePost = () => {
    const [postContent, setPostContent] = useState({
        title: '',
        summary: '',
        content: ''
    });
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const makePost = () => {

    }

    const inputChange = (e) => {
        if (e.target.name === 'image') handleImage(e);
        else {
            setPostContent({
                ...postContent,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleImage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                const result = reader.result;
                setImagePreview(result);
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <>
            <form className='form-post' onSubmit={makePost}>
                <input
                    type='text'
                    className='input'
                    placeholder='Title'
                    value={title || ''}
                    onChange={(e) => inputChange(e)} />
                <input
                    type='text'
                    className='input'
                    placeholder='Summary'
                    value={summary || ''}
                    onChange={(e) => inputChange(e)} />
                <div className='upload'>
                    {imagePreview && <img src={imagePreview} alt='Avatar Preview' />}
                    <label className="custom-file-input">
                        <input
                            type="file"
                            name="image"
                            value={''}
                            accept="image/*"
                            onChange={(e) => handleImage(e)}
                        />
                        <span className="custom-file-label">Choose a file</span>
                    </label>
                </div>
                <ReactQuill
                    theme='snow'
                    modules={customModules}
                    formats={customFormats}
                    value={content} />
                <button className='submit' style={{ marginTop: '20px' }}> Create Post</button>
            </form>
        </>
    )
}

export default CreatePost