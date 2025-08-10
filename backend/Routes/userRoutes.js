const express=require("express");
const { registerUser, loginUser, verifyEmail, createAddress, getAllAddresses, createOrder, getUserProfile, getUserOrders } = require("../Controlls/userController");

const userRouter=express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify/:token", verifyEmail);
userRouter.post("/address", createAddress);
userRouter.get("/addresses/:userId", getAllAddresses);
userRouter.post("/orders", createOrder);
userRouter.get("/profile/:userId", getUserProfile);
userRouter.get("/orders/:userId", getUserOrders);

module.exports = userRouter;
