import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';


const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const goTosessions = () => {
    navigate('/sessions')
  }


  
  return (
    <div>
      <h1 className='font-bold font-size 3xl'>Welcome to TrainZone{user ? `, ${user.firstName}` : ''}!</h1>
      <p>Your fit future is only a first session away!. Find a Session</p>
      <button onClick={goTosessions} className="bg-orange-500 rounded-[0.5rem] py-1.5 px-4 font-bold">Find Sessions</button>
    </div>
    
      

  );
};

export default Home;
