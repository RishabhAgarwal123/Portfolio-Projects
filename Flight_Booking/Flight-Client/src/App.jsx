import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Support from './components/Support/Support';
import Info from './components/Info/Info';
import Lounge from './components/Lounge/Lounge';
import Subscribe from './components/Subscribers/Subscribe';
import Travellers from './components/Travellers/Travellers';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Search />
      <Support />
      <Info />
      <Lounge />
      <Travellers />
      <Subscribe />
      <Footer />
    </div>
  )
}

export default App