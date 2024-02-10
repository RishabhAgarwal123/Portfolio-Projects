import React from 'react'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

const App = () => {
  return (
    <div className="container">
      <PostCreate />
      <hr />
      <h1>Post List</h1>
      <PostList />
    </div>
  )
}

export default App