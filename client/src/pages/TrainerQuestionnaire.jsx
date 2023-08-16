import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';  

const TrainerQuestionnaire = () => {
    const navigate = useNavigate();

    const [trainerData, setTrainerData] = useState({
      workouts: {}, 
      experience: '', 
      sessionTimes: {}, 
      info: ''
    });

  const [workouts, setWorkouts] = useState({
    yoga: false,
    calisthenics: false,
    zumba: false,
    boxing: false,
    pilates: false,
    coreTraining: false
  });

  const [experience, setExperience] = useState('');

  const [info, setInfo] = useState('');

  const [times, setTimes] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const handleWorkoutsChange = (event) => {
    const { name, checked } = event.target;
    setWorkouts((prevWorkouts) => ({
      ...prevWorkouts,
      [name]: checked,
    }));
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleTimesChange = (event) => {
    const { name, checked } = event.target;
    setTimes((prevTimes) => ({
      ...prevTimes,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {workouts, experience, sessionTimes, info} = trainerData;
    
    const selectedWorkouts = Object.keys(workouts).filter(key => workouts[key]);
    const selectedTimes = Object.keys(times).filter(key => times[key]);
    
    
  

    try {
      
      // Send questionnaire data to the server
      const response = await axios.post('/tques', {
        workouts: selectedWorkouts.join(', '),
        experience,
        sessionTimes: selectedTimes.join(', '),
        info
      });

        console.log('Server response:', response.data);      
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Data Submitted Successfully!');
        // Call the onSubmit function with the sessionData
        onSubmit(trainerData);
        // Clear the form after submission
        setTrainerData({
          workouts: {}, 
          experience: '', 
          sessionTimes: {}, 
          info: ''
           
        });

        navigate('/login')

      
      // Redirect to a thank you or confirmation page
    }
   }catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  const handleInfoChange = (event) => {
    setInfo(event.target.value);
  };



  return (
    <form>
      <div>
        <label>What kind of workouts can you teach:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="yoga"
              checked={workouts.yoga}
              onChange={handleWorkoutsChange}
            />
            Yoga
          </label>
          <label>
            <input
              type="checkbox"
              name="calisthenics"
              checked={workouts.calisthenics}
              onChange={handleWorkoutsChange}
            />
            Calisthenics
          </label>
          <label>
            <input
              type="checkbox"
              name="zumba"
              checked={workouts.zumba}
              onChange={handleWorkoutsChange}
            />
            Zumba
          </label>
          <label>
            <input
              type="checkbox"
              name="boxing"
              checked={workouts.boxing}
              onChange={handleWorkoutsChange}
            />
            Boxing
          </label>
          <label>
            <input
              type="checkbox"
              name="pilates"
              checked={workouts.pilates}
              onChange={handleWorkoutsChange}
            />
            Pilates
          </label>
          <label>
            <input
              type="checkbox"
              name="coretraining"
              checked={workouts.coreTraining}
              onChange={handleWorkoutsChange}
            />
            Core Training
          </label>
        </div>
      </div>
      <div>
        <label>How many years of experience do you have in your field:</label>
        <div>
          <label>
            <input
              type="radio"
              name="experience"
              value="Less than 3 years"
              checked={experience === 'Less than 3 years'}
              onChange={handleExperienceChange}
            />
            Less than 3 years
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="3 - 5 years"
              checked={experience === '3 - 5 years'}
              onChange={handleExperienceChange}
            />
            3 - 5 years
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value="More than 5 years"
              checked={experience === 'More than 5 years'}
              onChange={handleExperienceChange}
            />
            More than 5 years
          </label>
        </div>
      </div>
      <div>
        <label>What time can you offer sessions:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="morning"
              checked={times.morning}
              onChange={handleTimesChange}
            />
            Morning
          </label>
          <label>
            <input
              type="checkbox"
              name="afternoon"
              checked={times.afternoon}
              onChange={handleTimesChange}
            />
            Afternoon
          </label>
          <label>
            <input
              type="checkbox"
              name="evening"
              checked={times.evening}
              onChange={handleTimesChange}
            />
            Evening
          </label>
        </div>
         <label>Tell Us About Yourself!</label>
        <textarea
          value={info}
          onChange={handleInfoChange}
          placeholder="This is displayed to the customers. So go on, Impress them!"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default TrainerQuestionnaire;
