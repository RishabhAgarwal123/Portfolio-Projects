import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Auth/Login'
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
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App