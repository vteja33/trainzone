const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createSession, getSession, deleteSession } = require('../controllers/sessController');


//middleware
router.use(
    cors({
       credentials: true,
       origin: 'http://localhost:5173',
    })
)


router.post('/sessions', createSession)
router.get('/sessions', getSession)
router.delete('/sessions/:sessionID', deleteSession);


module.exports = router