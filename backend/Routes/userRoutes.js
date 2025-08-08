const express=require("express");
const { registerUser, loginUser, verifyEmail } = require("../Controlls/userController");

const userRouter=express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify/:token", verifyEmail);

module.exports = userRouter;
