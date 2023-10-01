import React from 'react'
import Navbar from './Navbar'
import Post from './Post'
import Login from './User/Login'
import Register from './User/Register'
import { Route, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import Home from './Home'
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:4000/api';
  axios.defaults.withCredentials = true;
  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover /> */}
      <main>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/:id' element={<Post />} />
        </Routes>
      </main>
    </>
  )
}

export default App