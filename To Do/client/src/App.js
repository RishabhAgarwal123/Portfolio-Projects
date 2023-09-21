import './App.css';
import Form from './components/Form';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Task from './components/Task';
import Tasks from './components/Tasks';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import Navbar from './components/Navbar';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1';
  axios.defaults.withCredentials = true;

  return (
    <>
      {/* <UserContextProvider> */}
        <Router>
          <Routes>
            <Route path='/' element={<Navbar />} />
            <Route path="/login" element={<Form />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/task" element={<Task />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      {/* </UserContextProvider> */}
    </>
  );
}

export default App;
