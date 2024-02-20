import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './components/About/About'
import ForgetPassword from './components/Auth/ForgetPassword'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ResetPassword from './components/Auth/ResetPassword'
import Contact from './components/Contact/Contact'
import Courses from './components/Courses/Courses'
import Home from './components/Home/Home'
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
import Request from './components/Request/Request'
import Subscribe from './components/Payment/Subscribe'
import NotFound from './components/Layout/Not Found/NotFound'
import PaymentFail from './components/Payment/PaymentFail'
import PaymentSuccess from './components/Payment/PaymentSuccess'
import CourseDetail from './components/Course Page/CourseDetail'
import Profile from './components/Profile/Profile'
import ChangePassword from './components/Profile/ChangePassword'
import UpdateProfile from './components/Profile/UpdateProfile'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import CreateCourse from './components/Admin/Create Course/CreateCourse'
import AdminCourses from './components/Admin/AdminCourses/AdminCourses'
import Users from './components/Admin/Users/Users'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getMyProfile } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader'

const App = () => {
  window.addEventListener('contextmenu', (e) => e.preventDefault());
  const { isAuthenticated, user, message, error, loading } = useSelector(state => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' })
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' })
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <Router>
      {
        loading ? <Loader /> : <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
              <ChangePassword />
            </ProtectedRoute>} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
              <CourseDetail user={user} />
            </ProtectedRoute>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
              <ForgetPassword />
            </ProtectedRoute>} />
            <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
              <Login />
            </ProtectedRoute>} />
            <Route path='/paymentfail' element={<PaymentFail />} />
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
              <Profile user={user} />
            </ProtectedRoute>
            } />
            <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
              <Register />
            </ProtectedRoute>} />
            <Route path='/request' element={<Request />} />
            <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
              <ResetPassword />
            </ProtectedRoute>} />
            <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
              <Subscribe user={user} />
            </ProtectedRoute>} />
            <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile user={user} />
            </ProtectedRoute>} />
            {/* Admin Routes */}
            <Route path='/admin/dashboard' element={<ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === 'admin'}
            >
              <Dashboard />
            </ProtectedRoute>} />
            <Route path='/admin/courses' element={<ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === 'admin'}
            >
              <AdminCourses />
            </ProtectedRoute>} />
            <Route path='/admin/createcourse' element={<ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === 'admin'}
            >
              <CreateCourse />
            </ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user?.role === 'admin'}
            >
              <Users />
            </ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      }
      <Toaster />
    </Router>
  )
}

export default App