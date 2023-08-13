const mongoose = require('mongoose')
const { Schema } = mongoose


const sessionSchema = new Schema({
    sessionInfo: String,
    sessionTitle: String,
    sessionType: String,
    trainer: String,
    time: Date,
    roomCode: String
})


const SessionModel = mongoose.model('Session', sessionSchema);

module.exports = SessionModel;