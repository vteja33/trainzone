import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './Navbar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { LoggedInSidebarData, LoggedOutSidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';
import logo from '../logo.png';


export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const [sidebar, setSidebar] = useState(false);
  //const [showLogout, setShowLogout] = useState(false);
  const sidebarData = user ? LoggedInSidebarData : LoggedOutSidebarData;

  const showSidebar = () => setSidebar(!sidebar);


  const handleLogoutClick = async () => {


    try {
      await axios.get('/logout'); // Assuming your backend handles the logout process
      setUser(null); // Clear the user data
      toast.success('Logout Successful');
      navigate('/'); // Redirect to the home page or any other desired page
    } catch (error) {
      console.error(error);
    }
    closeSidebar();
  };
    


  const closeSidebar = () => {
    setSidebar(false);
    //setShowLogout(false); // Close the LogoutUser when the sidebar is closed
  };

  const currentPageTitle = sidebarData.find(item => item.path === location.pathname)?.title;

  const goToDashboard = () => {
    navigate('/');
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars' onClick={showSidebar}>
            <FaIcons.FaBars />
          </Link>
          <button onClick={goToDashboard}>
            <img src = {logo} alt= "Logo" width="75" height="75" className='ml-4'></img>
          </button>
          
          <div className='page-title'>
          {currentPageTitle}
          </div>
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={closeSidebar}>
            {sidebarData.filter(item => item.title !== 'Logout').map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
            {user && (
              <li className='nav-text logout-item'>
                <button onClick={handleLogoutClick}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
