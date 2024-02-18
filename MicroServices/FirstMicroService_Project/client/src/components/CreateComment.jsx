import axios from 'axios';
import React, { useState } from 'react'

const CreateComment = ({ postId }) => {
    const [comment, setComment] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { comment: comment }, { "Content-Type": "application/json" });
        setComment('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <div className="form-group" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <label htmlFor="">New Comment</label>
                <input type="text" name="comment" id="comment" className="form-control" value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                />
            </div>
            <button className="btn btn-primary">Create Comment</button>
        </form>
        </div>
    )
}

export default CreateComment