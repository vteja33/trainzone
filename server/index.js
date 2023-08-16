const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require ('cookie-parser')
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database Not Connected', err))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded ({extended: false}))
//app.use(cors());



app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/sessRoutes'))


//Global error handling
app.use((err, req, res, next) => {
    console.log(err)
    const defaultErr = {
        log: 'unknown error occured',
        status: 500,
        message: {err: 'error has occured'}
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))