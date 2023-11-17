import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
import Link from './models/link.js';
const PORT =process.env.PORT || 5000;

const connetionToMongodb =async () =>{
const connect = await mongoose.connect(process.env.MONGODB_URL);
if(connect){
    console.log("server is connected");
}
}
connetionToMongodb();


app.listen(PORT,()=>{
    console.log("server is on ");
})