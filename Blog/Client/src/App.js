import React, { useContext } from 'react'
import Navbar from './Navbar'
import Post from './Post/Post'
import Login from './User/Login'
import Register from './User/Register'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home'
import axios from 'axios';
import { UserContext } from './UserContext'
import Logout from './User/Logout'
import CreatePost from './Post/CreatePost'
import DisplayPost from './Post/DisplayPost'
import EditPost from './Post/EditPost'
import DeletePost from './Post/DeletePost'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:4000/api';
  axios.defaults.withCredentials = true;
  const { authenticated } = useContext(UserContext);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main>
        {
          !authenticated && <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        }
        {authenticated && <>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/post/:id' element={<DisplayPost />} />
            <Route path='/edit/:id' exact element={<EditPost />} />
            <Route path='/delete/:id' exact element={<DeletePost />} />
          </Routes>
        </>}
      </main>
    </>
  )
}

export default App