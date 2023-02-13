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
import Home from './pages/home/home';
import ProtectedRoute from './components/protectedRoute';
import PublicRoute from './components/publicRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>} />
          <Route path='/register' element={<PublicRoute> <Register /> </PublicRoute>} />
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
