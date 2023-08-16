const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    userid: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    gender: String,
    info: String
})


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;