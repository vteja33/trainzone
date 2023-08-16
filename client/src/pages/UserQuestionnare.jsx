import React, { useState } from 'react';
import axios from 'axios';

const UserQuestionnaire = () => {
  const [workoutFrequency, setWorkoutFrequency] = useState('');
  const [workoutType, setWorkoutType] = useState({
    yoga: false,
    calisthenics: false,
    zumba: false,
    boxing: false,
    pilates: false,
    coreTraining: false,
  });
  const [goal, setGoal] = useState('');

  const handleFrequencyChange = (event) => {
    setWorkoutFrequency(event.target.value);
  };

  const handleWorkoutTypeChange = (event) => {
    const { name, checked } = event.target;
    setWorkoutType((prevWorkoutType) => ({
      ...prevWorkoutType,
      [name]: checked,
    }));
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/uques', {
        workoutFrequency,
        workoutType,
        goal,
      });

      if (response.data.success) {
        console.log('User questionnaire data submitted successfully.');
        // You can display a success message or navigate to another page here
      } else {
        console.error('Error submitting user questionnaire data.');
        // You can display an error message to the user
      }
    } catch (error) {
      console.error('Error submitting user questionnaire data:', error);
      // Handle the error accordingly, such as displaying an error message
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>How often do you workout:</label>
        <div>
          <label>
            <input
              type="radio"
              name="workoutFrequency"
              value="Once a week"
              checked={workoutFrequency === 'Once a week'}
              onChange={handleFrequencyChange}
            />
            Once a week
          </label>
          <label>
            <input
              type="radio"
              name="workoutFrequency"
              value="Multiple times a week"
              checked={workoutFrequency === 'Multiple times a week'}
              onChange={handleFrequencyChange}
            />
            Multiple times a week
          </label>
          <label>
            <input
              type="radio"
              name="workoutFrequency"
              value="None"
              checked={workoutFrequency === 'None'}
              onChange={handleFrequencyChange}
            />
            None
          </label>
        </div>
      </div>
      <div>
        <label>What kind of workout are you trying to do:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="yoga"
              checked={workoutType.yoga}
              onChange={handleWorkoutTypeChange}
            />
            Yoga
          </label>
          <label>
            <input
              type="checkbox"
              name="calisthenics"
              checked={workoutType.calisthenics}
              onChange={handleWorkoutTypeChange}
            />
            Calisthenics
          </label>
          <label>
            <input
              type="checkbox"
              name="zumba"
              checked={workoutType.zumba}
              onChange={handleWorkoutTypeChange}
            />
            Zumba
          </label>
          <label>
            <input
              type="checkbox"
              name="boxing"
              checked={workoutType.boxing}
              onChange={handleWorkoutTypeChange}
            />
            Boxing
          </label>
          <label>
            <input
              type="checkbox"
              name="pilates"
              checked={workoutType.pilates}
              onChange={handleWorkoutTypeChange}
            />
            Pilates
          </label>
          <label>
            <input
              type="checkbox"
              name="coreTraining"
              checked={workoutType.coreTraining}
              onChange={handleWorkoutTypeChange}
            />
            Core Training
          </label>
        </div>
      </div>
      <div>
        <label>What is your main goal:</label>
        <div>
          <label>
            <input
              type="radio"
              name="goal"
              value="Weight loss"
              checked={goal === 'Weight loss'}
              onChange={handleGoalChange}
            />
            Weight loss
          </label>
          <label>
            <input
              type="radio"
              name="goal"
              value="Building muscle"
              checked={goal === 'Building muscle'}
              onChange={handleGoalChange}
            />
            Building muscle
          </label>
          <label>
            <input
              type="radio"
              name="goal"
              value="Maintain fitness"
              checked={goal === 'Maintain fitness'}
              onChange={handleGoalChange}
            />
            Maintain fitness
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserQuestionnaire;

