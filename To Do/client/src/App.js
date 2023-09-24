import './App.css';
import Form from './components/Form';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Tasks from './components/Tasks';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import store from './redux/store';
import Loader from './components/Loader';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000/api/v1';
  axios.defaults.withCredentials = true;

  return (
    <>
      <Provider store={store}>
      <Loader />
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
