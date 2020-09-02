//import everything here
import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";

//for cross origin resource sharing
import cors from 'cors'
import config from './config'

// using env values
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

console.log(process.env)

//Use bodyParser
import bodyParser from 'body-parser'
app.use(bodyParser.json())

//---------------------------------------------------------------------
// database 
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex:true
});


const connection = mongoose.connection;
connection.once('open', ()=>console.log("database connected"));
//---------------------------------------------------------------------
//import routing here


var mtseFormRouter = require('./routes/mtseForm.route');
var puzzleRaceFormRouter = require('./routes/puzzleRaceForm.route');
var fhsFormRouter = require('./routes/fhsForm.route');
var chessFormRouter = require('./routes/chessForm.route');
var careercFormRouter = require('./routes/carrerForm.route');
var rangotsavFormRouter = require('./routes/rangotsavForm.route');
var valid = require('./routes/validForm.route');
var userForm = require('./model/userForm.model');

const authRouter = require('./routes/auth.route')
app.use('/', authRouter)

const faqRouter = require('./routes/faq.route')
app.use('/faq',faqRouter)

const profileRouter = require('./routes/profile.route')
app.use('/user/',profileRouter)
//---------------------------------------------------------------------
//Handle request here

app.get('/',(req, res)=>{
    res.json({
        "msg": "Navprayas Backend is Up",
        "isRunning": true
        })
})

app.use('/mtse',mtseFormRouter);                                       // request on /mtse 
app.use('/puzzlerace',puzzleRaceFormRouter);                           // request on /puzzlerace
app.use('/fhs',fhsFormRouter);                                         // request on /fhs
app.use('/chess',chessFormRouter);                                     // request on /chess
app.use('/career',careercFormRouter);                                  // request on /career
app.use('/rangotsav',rangotsavFormRouter);                             // request on /rangotsav

// creating server and running
app.listen(config.PORT, ()=> console.log(`server is running at http://localhost:${config.PORT}`))

