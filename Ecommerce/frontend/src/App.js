
import { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar/Navbar.js'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './component/Product/ProductDetail';
import Product from './component/Product/Product';
import Login from './component/User/Login';
import Register from './component/User/Register';
import { useDispatch } from 'react-redux';
import { useLoadUserQuery } from './redux/api';

function App() {
  const dispatch = useDispatch();
  const { data, error } = useLoadUserQuery();

  const loadUserData = () => {
    console.log(data);
    console.log(error)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
    loadUserData();
  }, []);

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
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetail />} />
          <Route exact path='/products' element={<Product />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />}/>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
