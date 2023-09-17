import './App.css';
import Form from './components/Form';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Task from './components/Task';
import Tasks from './components/Tasks';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Form />} />
          <Route exact path='/tasks' element={<Tasks />} />
          <Route exact path='/task' element={<Task />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
