//import everything here
import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";
//for cross origin resource sharing
import cors from 'cors'
import config from '../config'
// using env values 
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

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
    res.send("Welcome to Navprayas Backend")
})


// creating server and running
const port = 5000;
app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`))

