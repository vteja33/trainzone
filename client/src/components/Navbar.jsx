import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import './Navbar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';
import LogoutUser from './LogoutUser';

export default function Navbar() {
  const { user } = useContext(UserContext);

  const [sidebar, setSidebar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogoutClick = () => {
    setShowLogout(!showLogout);
    closeSidebar();
  };

  const closeSidebar = () => {
    setSidebar(false);
    setShowLogout(false); // Close the LogoutUser when the sidebar is closed
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars' onClick={showSidebar}>
            <FaIcons.FaBars />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={closeSidebar}>
            {SidebarData.filter(item => item.title !== 'Logout').map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          {user && (
            <LogoutUser showLogout={showLogout} setShowLogout={setShowLogout} />
          )}
        </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
