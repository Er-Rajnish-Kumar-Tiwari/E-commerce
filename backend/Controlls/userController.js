const user = require("../Models/userModels");
const crypto=require("crypto"); 
const nodemailer=require("nodemailer");


const sendVerificationEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "tanishzon.com",
        to: email,
        subject: "Email Verification",
        text: `Please verify your email by clicking on the following link: http://localhost:2000/api/users/verify/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error("Error sending verification email:", error);
        }
        console.log("Verification email sent:", info.response);
    });
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const foundUser = await user.findOne({ verificationToken: token });
        if (!foundUser) {
            return res.status(400).json({ message: "Invalid token" });
        }

        foundUser.verified = true;
        foundUser.verificationToken = undefined;
        await foundUser.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in verifyEmail:", error.message);
        res.status(500).json({ message: "Email verification failed", error: error.message });
    }
};

const registerUser=async (req, res) => {

    try {
        const {name,email,password}=req.body;

        if(!name || !email || !password){
           return res.status(400).json({ message: "All fields are required" });
        }

        // Continue with user registration logic
        const existUser=await user.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new user({ name, email, password });
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        await newUser.save();

        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({ message: "User registered successfully" });
    } 
    catch (error) {
       console.error("Error in registerUser:", error.message);
       res.status(500).json({ message: "Registration failed" ,error: error.message });
    }
};

const loginUser=async (req, res) => {

};

module.exports = { registerUser, loginUser , verifyEmail , sendVerificationEmail };