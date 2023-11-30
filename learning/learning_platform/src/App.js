import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgetPassword from './components/Auth/ForgetPassword'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ResetPassword from './components/Auth/ResetPassword'
import Courses from './components/courses/Courses'
import Home from './components/home/Home'
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'

const App = () => {
  return (
    <Router>
      <Header/ >
      <Routes> 
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App