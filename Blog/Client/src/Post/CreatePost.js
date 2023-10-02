import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Post.css';

const CreatePost = () => {
    const [imagePreview, setImagePreview] = useState('');
    const makePost = () => {

    }
    return (
        <>
            <form className='form' onSubmit={makePost}>
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
                            onChange={() => console.log()}
                            />
                        <span className="custom-file-label">Choose a file</span>
                    </label>
                </div>
                <ReactQuill />
                <button className='submit' style={{ marginTop: '20px'}}> Create Post</button>
            </form>
        </>
    )
}

export default CreatePost