
// const { TQues, UQues} = require('../models/questionnaire')


// //Register User
// const TrainerQ = async (req, res) => {
//     try {
//         const { workouts, experience, sessionTimes, info} = req.body;

//         const tques = await TQues.create({
//             workouts,
//             experience,
//             sessionTimes,
//             info
//         })

//         return res.json(tques);
//     } catch (error) {
//         console.error('Error registering user:', error);
//         return res.status(500).json({ error: 'An internal server error occurred.' });
//     }
// }

// const UserQ = async (req, res) => {
//     try {
//         const { user, workoutFrequency, workoutType, goal } = req.body;

//         const uques = await UQues.create({
//             user,
//             workoutFrequency,
//             workoutType,
//             goal
//         })

//         return res.json(uques);
//     } catch (error) {
//         console.error('Error saving data', error);
//         return res.status(500).json({ error: 'An internal server error occurred.' });
//     }
// }

// const getTrainerQ = async (req, res) => {
//   try {
//     //console.log('Teja')
//     // Fetch all sessions from the database
//     let trainerq = await TQues.find();
//     //console.log('Fetched sessions:', sessions);

//     // If there are no sessions in the database
//     if (!trainerq || trainerq.length === 0) {
//       return res.status(404).json({ message: 'No sessions found' });
//     }

//     // Send the sessions as a JSON response
//     return res.status(200).json({ trainerq });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// const getUserQ = async (req, res) => {
//   try {
//     //console.log('Teja')
//     // Fetch all sessions from the database
//     let userq = await UQues.find();
//     //console.log('Fetched sessions:', sessions);

//     // If there are no sessions in the database
//     if (!userq || userq.length === 0) {
//       return res.status(404).json({ message: 'No sessions found' });
//     }

//     // Send the sessions as a JSON response
//     return res.status(200).json({ userq });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };











// export default {
//     TrainerQ,
//     UserQ,
//     getTrainerQ,
//     getUserQ
    
// }