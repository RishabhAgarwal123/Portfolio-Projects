// Custom styles
import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/theme.css';
import './stylesheets/typography.css';
// Routing stuff
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Compoenets
import Login from './pages/login/login';
import Register from './pages/register/register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
