
import { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar/Navbar.js'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './component/Product/ProductDetail';
import Product from './component/Product/Product';
import Login from './component/User/Login';
import Register from './component/User/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadUserQuery } from './redux/api';
import { userSliceActions } from './redux/slices/userSlice';
import Account from './component/Account/Account';
import Dashboard from './component/Dashboard/Dashboard';
import Order from './component/Orders/Order';
import Logout from './component/User/Logout';

function App() {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.user);
  const { data, error, isLoading } = useLoadUserQuery();

  const loadUserData = () => {
    if (!isLoading) {
      if (error) {
        dispatch(userSliceActions.setError(error));
        dispatch(userSliceActions.setLoading(false));
        toast.error(error.error);
        dispatch(userSliceActions.resetState());
      } else {
        dispatch(userSliceActions.setLoading(false));
        dispatch(userSliceActions.setAuthenticated(true));
        dispatch(userSliceActions.setUser(data.user))
        toast.success(data.message)
      }
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
    loadUserData();
  }, []);
  console.log(authenticated)

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
        pauseOnHover />
      <Router>
        <>
          {authenticated && <>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/product/:id' element={<ProductDetail />} />
              <Route exact path='/products' element={<Product />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/account' element={<Account />} />
              <Route exact path='/orders' element={<Order />}/>
              <Route exact path='/dashboard' element={<Dashboard />}/>
              <Route exact path='/logout' element={<Logout />}/>
            </Routes>
            <Footer />
          </>
          }
          {!authenticated && <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>}
        </>
      </Router>
    </>
  );
}

export default App;
