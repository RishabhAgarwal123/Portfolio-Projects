import React from 'react'

const CommentList = ({ comments }) => {
    const renderComments = comments?.map(comm => {
        return <li key={comm.id}>{comm.comment}</li>
    })

    return (
        <ul>
            {renderComments}
        </ul>
    )
}

export default CommentList