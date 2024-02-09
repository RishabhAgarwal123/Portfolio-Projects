import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("http://localhost:4000/posts", { title: title }, { "Content-Type": "application/json" });
         
        setTitle('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <label htmlFor="">Post Title</label>
                <input type="text" name="title" id="title" className="form-control" value={title} 
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                />
            </div>
            <button className="btn btn-primary">Create Post</button>
        </form>
    )
}

export default PostCreate