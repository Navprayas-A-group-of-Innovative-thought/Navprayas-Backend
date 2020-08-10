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

//---------------------------------------------------------------------
//Handle request here

app.get('/',(req, res)=>{
    res.json({
        "msg": "Navprayas Backend is Up",
        "isRunning": true
        })
})


// creating server and running
app.listen(config.PORT, ()=> console.log(`server is running at http://localhost:${config.PORT}`))

