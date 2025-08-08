// this is called packages 
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const crypto=require("crypto"); 
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
const dbConnnection = require("./Config/db");
const cloudinaryConnection = require("./Config/cloudinary");
const userRouter = require("./Routes/userRoutes");
require("dotenv").config();


// this is called configration file  and middleware 
const app=express();
app.use(express.json());
app.use(cors());
dbConnnection();
cloudinaryConnection();

app.use("/api/users", userRouter);


// This is called endpoints.example of endpoints , http://localhost:2000/
app.post("/",(req,res)=>{
    const {fullName}=req.body;
    res.send({Massage:"Api working",fullName});
    console.log("Api working ",fullName);
});


// this server running on given port
app.listen(process.env.PORT);