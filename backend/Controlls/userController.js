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

    const verifyUrl = `${process.env.BASE_URL}/api/users/verify/${token}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: `
            <h3>Email Verification</h3>
            <p>Click the link below to verify your email:</p>
            <a href="${verifyUrl}">Verify Email</a>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending verification email:", error);
        } else {
            console.log("Verification email sent:", info.response);
        }
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

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const foundUser = await user.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: "user not authorized" });
        }

        const isMatch = await foundUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful" });
    } 
    catch (error) {
       console.error("Error in loginUser:", error.message);
       res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports = { registerUser, loginUser , verifyEmail , sendVerificationEmail };