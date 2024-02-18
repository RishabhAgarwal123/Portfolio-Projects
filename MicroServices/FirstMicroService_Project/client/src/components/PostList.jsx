import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4000/posts");
        setPosts(res.data);
    }

    const renderPosts = Object.values(posts)?.map(post => {
        return <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList postId={post.id} />
                <CreateComment postId={post.id} />
            </div>
        </div>
    })

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    )
}

export default PostList