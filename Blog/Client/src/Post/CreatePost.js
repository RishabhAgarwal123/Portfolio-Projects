import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Post.css';

const CreatePost = () => {
    const [imagePreview, setImagePreview] = useState('');

    const makePost = () => {

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
                <input type='text' className='input' placeholder='Title' />
                <input type='text' className='input' placeholder='Summary' />
                <div className='upload'>
                    {imagePreview && <img src={imagePreview} alt='Avatar Preview' />}
                    <label className="custom-file-input">
                        <input
                            type="file"
                            name="avatar"
                            value={''}
                            accept="image/*"
                            onChange={(e) => handleImage(e)}
                            />
                        <span className="custom-file-label">Choose a file</span>
                    </label>
                </div>
                <ReactQuill theme='snow' />
                <button className='submit' style={{ marginTop: '20px'}}> Create Post</button>
            </form>
        </>
    )
}

export default CreatePost