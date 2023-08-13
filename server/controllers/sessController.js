const Session = require('../models/sessions')


const createSession = async (req, res) => {
    try {
        const { sessionInfo, sessionTitle, sessionType, trainer, time, roomCode } = req.body;
        
        
        const session = await Session.create({
            sessionInfo,
            sessionTitle,
            sessionType,
            trainer, 
            time,
            roomCode
        })

        return res.json(session)

    } catch (error) {
        console.log(error)
    }

    

}

const getSession = async (req, res) => {
  try {
    //console.log('Teja')
    // Fetch all sessions from the database
    let sessions = await Session.find();
    //console.log('Fetched sessions:', sessions);

    // If there are no sessions in the database
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found' });
    }

    // Send the sessions as a JSON response
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteSession = async (req, res) => {

  try {
    const {sessionID} = req.params;

    await Session.findByIdAndDelete(sessionID);

    return res.status(200).json({message: 'Session Deleted.'})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting session' });
    
  }

};


module.exports = {
    createSession,
    getSession,
    deleteSession
}
