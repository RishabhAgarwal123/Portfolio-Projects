import './App.css';
import axios from 'axios';
import { UserContextProvider } from './ context/UserContext';
import Routes from './Routes';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  )
}

export default App