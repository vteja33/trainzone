import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trainers.css';
import { useNavigate } from 'react-router-dom';
import { ZIMKitChatListVM, ZIMKitConversationType } from '@zegocloud/zimkit-react';
import * as AiIcons from 'react-icons/ai';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    axios.get('/trainers')
      .then(response => {
        setTrainers(response.data);
      })
      .catch(error => {
        console.error('Error fetching trainers:', error);
      });
  }, []);

  useEffect(() => {
  const filtered = trainers.filter((trainer) =>
    trainer.firstName && trainer.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredTrainers(filtered);
}, [trainers, searchTerm]);


  const capitalizeFirstLetter = (str) => {
    if (!str) {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const startChatWithTrainer = async (trainerId) => {
    try {
      navigate(`/chat`);
      ZIMKitChatListVM.getInstance().initWithConversationID(
        trainerId,
        ZIMKitConversationType.ZIMKitConversationTypePeer
      );
      console.log('Chat session created with trainer:', trainerId);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const toggleSearch= () => {
    setIsSearchVisible(!isSearchVisible);
  }

  return (
    <div>
      {/* <h1 className='py-1.5 px-10 font-bold text-4xl absolute top-20 center mt-4'>Trainers</h1> */}
      <div className='trainer-search-container'>
        <button
          className="search-icon"
          onClick={toggleSearch}
        >
          < AiIcons.AiOutlineSearch/>
        </button>
        <input
          className="bg-500 rounded-[0.5rem] py-1.5 px-4 font-bold absolute top-20 right-40 mt-4 mr-34"
          type='text'
          placeholder='Search Trainers'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className='trainer-container'>
        {filteredTrainers.map(trainer => (
          <div key={trainer._id} className='trainer-item'>
            <h2>{capitalizeFirstLetter(trainer.firstName)}</h2>
            <p>Gender: {trainer.gender}</p>
            <p>Username: {trainer.userid}</p>
            <p>About {trainer.firstName}: {trainer.info}</p>
            <button onClick={() => { startChatWithTrainer(trainer.userid) }} className="message-trainer-button">Message</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
