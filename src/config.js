import dotenv from "dotenv";
dotenv.config();


export default {  
  MONGODB_URL: process.env.LOCAL_MONGODB_URL || process.env.MONGODB_URL ,
  PORT : process.env.PORT || 5000
};

  