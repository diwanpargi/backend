//require('dotenv').config({path:'./env'})

import dotenv from "dotenv"

// import mongoose from "mongoose"
// import { DB_name } from "./constants"

import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port :${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!!",err)
})










/*
import express from "express"
const app=express()

(async ()=>{
    try{
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
     app.on("error",(console.error();
     )=>{
        console.log("ERROR",error);
        throw error
     })
     
   
    }
    catch(error){
        console.log("ERROR :",error)
        throw err
    }
})()
*/