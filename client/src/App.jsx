
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';

import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import Room from './pages/Room';
import Trainers from './pages/Trainers';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


function App() {
  

  return (
    <UserContextProvider>
      <Navbar className ="navbar"/>
      <Toaster position ='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
      <Route path= '/' element={<Home />} />
      <Route path= '/register' element={<Register />} />
      <Route path= '/login' element={<Login />} />
      <Route path= '/dashboard' element={<Dashboard />} />
      <Route path='/sessions' element={<Sessions />} />
      <Route path='/trainers' element={<Trainers />} />
      <Route path='/room/:roomID' element={<Room />} />

  
      </Routes>
    
    </UserContextProvider>
  )
}

export default App;
