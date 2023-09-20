import './App.css';
import Form from './components/Form';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Task from './components/Task';
import Tasks from './components/Tasks';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1';
  axios.defaults.withCredentials = true;
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Form />} />
            <Route exact path='/tasks' element={<Tasks />} />
            <Route exact path='/task' element={<Task />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
