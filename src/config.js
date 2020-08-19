import dotenv from "dotenv";
dotenv.config();


export default {  
    MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://Navprayas:123@Kedar@cluster0-sb4wy.mongodb.net/Navprayas?retryWrites=true&w=majority" ,
  };

  