import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trainers.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    // Fetch trainers data from the server
    axios.get('/trainers')
      .then(response => {
        setTrainers(response.data);
      })
      .catch(error => {
        console.error('Error fetching trainers:', error);
      });
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
    <div>
      <h1 className='py-1.5 px-10 font-bold text-4xl absolute top-20 center mt-4'>Trainers</h1>
      <div className='trainer-container'>
        {trainers.map(trainer => (
          <div key={trainer._id} className='trainer-item'>
            <h2>{capitalizeFirstLetter(trainer.name)}</h2>
            <p>Gender: {trainer.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
