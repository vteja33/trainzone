const { compare } = require('bcrypt')
const { hashPassword, comparePasswords } = require('../helpers/auth')
const jwt = require('jsonwebtoken'); 

const User = require('../models/user')


const test = (req, res) => {
    res.json('test is working')
}


//Register User
const registerUser =async (req, res) => {
    try {
        const {name, email, password, role, gender} = req.body;
        if(!name) {
            return res.json({
                error: "Name is required."
            })
        };
        if(!password || password.length < 8) {
            return res.json ({
                error: "Password is required and it should be 8 characters long minimum."
            })
        };
        //check email
        const exist = await User.findOne({email})
        if(exist) {
            return res.json ({
                error: "Email is already taken. Try another one."
            })
        };

        const hashedPassword = await hashPassword(password)


        const user = await User.create({
            name,
            email , 
            password: hashedPassword,
            role,
            gender
        })

        return res.json(user)
        
    } catch (error) {
        console.log(error)
    }

}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user) {
            return res.json ({
                error: "User not found. Try again."
            })
        };

        //check if passwords match
        const match = await comparePasswords(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err
                res.cookie('token', token).json(user)
            })
            
        }
        if(!match) {
            res.json({
                error: 'Incorrect Password. Try again.'
            })
        }
    } catch (error) {
        console.log(error)
    }

}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }
    else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}