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
      await axios.get('/logout'); // Assuming your backend handles the logout process
      setUser(null); // Clear the user data
      toast.success('Logout Successful');
      navigate('/'); // Redirect to the home page or any other desired page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`nav-menu-items ${showLogout ? 'logout-list' : ''}`}>
      {showLogout && (
        <li className='nav-text logout-item'>
          <button onClick={handleLogout}>
            Logout
          </button>
        </li>
      )}
    </div>
  );
}
