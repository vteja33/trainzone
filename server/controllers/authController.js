const { compare } = require('bcrypt')
const { hashPassword, comparePasswords } = require('../helpers/auth')
const jwt = require('jsonwebtoken'); 

const User = require('../models/user')



const test = (req, res) => {
    res.json('test is working')
}


//Register User
const registerUser = async (req, res) => {
    try {
        const {name, email, userid, password, role, gender} = req.body;
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
        const user_exist = await User.findOne({userid})
        if(user_exist) {
            return res.json ({
                error: "Email is already taken. Try another one."
            })
        };

        const hashedPassword = await hashPassword(password)


        const user = await User.create({
            name,
            email , 
            userid,
            password: hashedPassword,
            role,
            gender,
            
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
            jwt.sign(
                {
                    email: user.email, 
                    id: user._id, 
                    name: user.name, 
                    role: user.role, 
                    gender: user.gender, 
                    userid: user.userid
                }, 
                process.env.JWT_SECRET, {}, (err, token) => {
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
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};


const getUser = async (req, res) => {
  try {
    //console.log('Teja')
    // Fetch all sessions from the database
    let users = await User.find();
    //console.log('Fetched sessions:', sessions);

    let trainers = users.filter(user => user.role === 'Trainer');

    // If there are no sessions in the database
    if (!trainers || trainers.length === 0) {
      return res.status(404).json({ message: 'No Trainers found' });
    }

    // Send the sessions as a JSON response
    return res.status(200).json(trainers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logout Successful.'});

};


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getUser
}