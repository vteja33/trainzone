import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
//import { useNavigate } from 'react-router-dom';


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

const SessionModal = ({ isOpen, onClose, onSubmit }) => {
  //const navigate = useNavigate();

  const { user } = useContext(UserContext);
 //console.log(user?.name);

  const [sessionData, setSessionData] = useState({
    sessionInfo: '',
    sessionTitle: '',
    sessionType: '',
    trainer: '',
    time: '',
    roomCode: ''
  });



  const generateRoomCode = () => {
        // Generate a random room code here, you can use a similar approach to your randomID function
        const randomRoomCode = randomID(7);
        return randomRoomCode;
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { sessionInfo, sessionTitle, sessionType, trainer, time, roomCode } = sessionData;

    const newRoomCode = generateRoomCode();

    console.log(newRoomCode);

    try {
      const response = await axios.post('/sessions', {
        sessionInfo,
        sessionTitle,
        sessionType,
        trainer: user.name,
        time,
        roomCode: newRoomCode
      });

      console.log('Server response:', response.data);
      console.log(response.data.roomCode)

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Session Created Successfully!');
        // Call the onSubmit function with the sessionData
        onSubmit(sessionData);
        // Clear the form after submission
        setSessionData({
          sessionInfo: '',
          sessionTitle: '',
          sessionType: '',
          trainer: '',
          time: '',
          roomCode: ''
        });
        onClose(); // Close the modal
        console.log('Modal should be closed now.');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Failed to create session');
    }
  };






  // Custom styles for the modal
  const customStyles = {
    content: {
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-50%, -50%)', // Move the modal to the center
      width: '80%', // Set the width of the modal
      maxWidth: '400px', // Set a maximum width
    },
  };

  return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Session Modal"
    style={customStyles}
  >
    <h2>Create Session</h2>
    <form>
      <div className="input-field">
        <label>Session Title:</label>
        <input
          type="text"
          name="sessionTitle"
          value={sessionData.sessionTitle}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-field">
        <label>Session Type:</label>
        <select
          value={sessionData.sessionType}
          onChange={handleInputChange}
          name="sessionType"
        >
          <option value="">Select Type</option>
          <option value="Core Workout">Core Workout</option>
          <option value="Yoga">Yoga</option>
          <option value="CalisthePilates">CalisthePilates</option>
          <option value="Pilates">Pilates</option>
          <option value="Boxing">Boxing</option>
        </select>
      </div>

      <div className="input-field">
        <label>Time:</label>
        <input
          type="datetime-local"
          name="time"
          value={sessionData.time}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-field">
        <label>Description:</label>
        <input
          type="text"
          name="sessionInfo"
          value={sessionData.sessionInfo}
          onChange={handleInputChange}
        />
      </div>

      <div className="button-group">
        <button onClick={handleSubmit}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </form>
  </Modal>
);

};


export default SessionModal;
