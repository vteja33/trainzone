import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LogoutUser({ showLogout, setShowLogout }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/logout'); 
      setUser(null); // Clear the user data
      toast.success('Logout Successful');
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error(error);
    }
  };
}



