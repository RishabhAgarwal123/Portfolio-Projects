
import { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar/Navbar.js'
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    })
  }, []);

  return (
    <>
      <Router>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
