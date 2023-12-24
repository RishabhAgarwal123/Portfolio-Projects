import Navbar from '@/scenes/Navbar';
import { useEffect, useState } from 'react';
import { SelectedPage } from './shared/types';
import Benefits from './scenes/benefits';
import Home from '@/scenes/Home';
import OurClasses from './scenes/ourClasses';
import ContactUs from './scenes/contactUs';
import Footer from './scenes/footer';

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<Boolean>(true);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsTopOfPage(true);
      setSelectedPage(SelectedPage.Home);
    } else setIsTopOfPage(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='app bg-gray-20'>
      <Navbar selectedPage={selectedPage} setSelectedPage={() => setSelectedPage} isTopOfPage={isTopOfPage} />
      <Home setSelectedPage={() => setSelectedPage} />
      <Benefits setSelectedPage={() => setSelectedPage} />
      <OurClasses setSelectedPage={() => setSelectedPage} />
      <ContactUs setSelectedPage={() => setSelectedPage} />
      <Footer />
    </div>
  )
}

export default App