const express = require('express');
const dotenv = require('dotenv');

const path =require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express()

//const authRoute = require('./routes/auth.js')
 const userRoute = require('./routes/user')
 const pinRoute = require('./routes/pin.js')


const connectDb = require('./config/db')
dotenv.config({ path: "./config/.env" });

 connectDb()



 app.use(morgan('dev'))
 
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())



 app.use('/api/v1', userRoute)
// app.use('/api/v1', authRoute)
 app.use('/api/v1', pinRoute)


const port = process.env.PORT
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
})