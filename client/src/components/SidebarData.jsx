import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoMdLogIn />,
    cName: 'nav-text'
  },
  {
    title: 'Register',
    path: '/register',
    icon: <IoIcons.IoMdLogIn />,
    cName: 'nav-text'
  },
  {
    title: 'Sessions',
    path: '/sessions',
    icon: <IoIcons.IoMdCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Trainers',
    path: '/trainers',
    icon: <IoIcons.IoMdFitness />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <IoIcons.IoMdLogOut />,
    cName: 'nav-text logout-item'
  },
];