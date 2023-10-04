import React from 'react'

const Post = ({ title, summary, content, image }) => {
  return (
    <>
      <div className='post'>
        <div className='image'>
          <img src={image} alt={title} />
        </div>
        <div className='post-text'>
          <h2>{title}</h2>
          <p className='info'>
            <a className='author' href='/'>Rishabh Agarwal</a>
            <time>2023-09-30</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>
      </div>
      <div className='post'>
        <div className='image'>
          <img src='https://www.klippa.com/wp-content/uploads/2023/01/ChatGPT-preview.jpg' alt='Name' />
        </div>
        <div className='post-text'>
          <h2>What is ChatGPT and why does it matter?</h2>
          <p className='info'>
            <a className='author' href='/'>Rishabh Agarwal</a>
            <time>2023-09-30</time>
          </p>
          <p className='summary'>ChatGPT is a natural language processing tool driven by AI technology that allows you to have human-like conversations and much more with the chatbot. The language model can answer questions and assist you with tasks, such as composing emails, essays, and code.</p>
        </div>
      </div>
    </>
  )
}

export default Post