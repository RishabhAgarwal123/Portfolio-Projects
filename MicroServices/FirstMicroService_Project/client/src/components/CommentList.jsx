import React, { useEffect, useState } from 'react'
import axios from 'axios';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    }

    const renderComments = comments.map(comment => {
        return <li key={comment.id}>{comment.comment}</li>
    })

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <ul>
            {renderComments}
        </ul>
    )
}

export default CommentList