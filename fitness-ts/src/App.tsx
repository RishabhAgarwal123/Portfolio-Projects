import Navbar from '@/scenes/Navbar';
import { useEffect, useState } from 'react';
import { SelectedPage } from './shared/types';

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
    </div>
  )
}

export default App