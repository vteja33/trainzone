import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import SessionModal from '../components/SessionModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Sessions.css';
import * as AiIcons from 'react-icons/ai';




function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const Sessions = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  //console.log('User Role:', user?.role);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleSubmitModal = (sessionData) => {
    // Handle session data submission
    console.log('Session Data:', sessionData);

    closeModal(); // Close the modal after submission
  };

  const generateRoomCode = () => {
      
      const randomRoomCode = randomID(7);
      return randomRoomCode;
  };


  const createMeeting = () => {
    const newRoomCode = generateRoomCode();
    navigate(`/room/${newRoomCode}`);
  };



  useEffect(() => {
    axios.get('/sessions')
    .then((response) => {
      console.log('Sessions response:', response.data);
      setSessions(response.data.sessions);
    })
    .catch((error) => {
      console.error('Sessions error:', error);
    });
  }, []);

  

  const filteredSessions = sessions.filter((session) => {
    const lowerCaseSearchQuery = searchTerm.toLowerCase();
    return (
      session.sessionTitle.toLowerCase().includes(lowerCaseSearchQuery) ||
      session.trainer.toLowerCase().includes(lowerCaseSearchQuery) ||
      session.sessionType.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  const handleCancelSession = (sessionID) => {
    axios.delete(`/sessions/${sessionID}`)
    .then((response) => {
      
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionID)
      );

      toast.success('Session Cancelled.')
    })
    .catch((error) => {
      console.error('Error deleting session:', error);
    });
};

const sortedSessions = sessions.slice().sort((a, b) => new Date(a.time) - new Date(b.time));

const getCurrentTime = () => new Date();

const shouldShowLink = (scheduledTime) => {
    const currentTime = getCurrentTime();
    const timeDifference = scheduledTime - currentTime;
    return timeDifference <= 5 * 60 * 1000; // 5 minutes in milliseconds
};

const formatTime = (time) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(time).toLocaleString('en-US', options);
};



const toggleSearch = () => {

  setIsSearchVisible(!isSearchVisible);

}


  
  return (
    <div>
      <div >
        <button
          className="search-icon"
          onClick={toggleSearch}
        >
          < AiIcons.AiOutlineSearch/>
        </button>
        {isSearchVisible && (
          <input
            className="bg-500 rounded-[0.5rem] py-1.5 px-4 font-bold absolute top-20 right-40 mt-4 mr-80"
            type='text'
            placeholder='Search Sessions'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}
      </div>

      {user?.role === 'Trainer' && (
        <><button
          onClick={createMeeting}
          className="bg-orange-500 rounded-[0.5rem] py-1.5 px-4 font-bold absolute top-20 right-40 mt-4 mr-40">
          Create Meeting
        </button><button
          onClick={openModal}
          className="bg-green-500 rounded-[0.5rem] py-1.5 px-4 font-bold absolute top-20 right-0 mt-4 mr-40"
        >
            Create Session
          </button></>
      )}

      <div className='session-container'>
        {filteredSessions
        .filter((session) => new Date(session.time) > getCurrentTime())
        .map((session) => (
          <div key={session._id} className='session-item'> 

          <h1 className='font-bold'>{session.sessionTitle}</h1>
          <p>Description: {session.sessionInfo}</p>
          <p>Category: {session.sessionType}</p>
          <p>Hosted By: {session.trainer}</p>
          <p>Time: {formatTime(session.time)}</p>

          {shouldShowLink(new Date(session.time)) && session.roomCode && (
            <button
              onClick={() => navigate(`/room/${session.roomCode}`)}
              className="join-meeting-button"
            >
            Join Meeting
            </button>
            )}
            {user?.role === 'Trainer' &&(
              <button
              onClick={() => handleCancelSession(session._id)}
              className="cancel-button"
            >
            Cancel
            </button>

            )}
            
            

            
        </div>

      ))}
      </div>
      
      

      <SessionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
};

export default Sessions;
