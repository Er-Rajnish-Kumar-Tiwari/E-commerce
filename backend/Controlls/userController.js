const user = require("../Models/userModels");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const order = require("../Models/orderModels");

const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email,
      pass: process.env.Email_Password,
    },
  });

  const verifyUrl = `${process.env.BASE_URL}/api/users/verify/${token}`;

  const mailOptions = {
    from: "Tanishzon.com",
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
    res
      .status(500)
      .json({ message: "Email verification failed", error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Continue with user registration logic
    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new user({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "user not authorized" });
    }
    if (!foundUser.verified) {
      return res.status(400).json({ message: "Email not verified" });
    }
    if (foundUser.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

//endpoint to store a new address to the backend
const createAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const foundUser = await user.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    foundUser.addresses.push(address);

    //save the updated user in te backend
    await foundUser.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
};

//endpoint to get all the addresses of a particular user
const getAllAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;

    const foundUser = await user.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = foundUser.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the addresses" });
  }
};

//endpoint to store all the orders
const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const foundUser = await user.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
};

//get the user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const foundUser = await user.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: foundUser });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
};

// get the user orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  sendVerificationEmail,
  createAddress,
  getAllAddresses,
  createOrder,
  getUserProfile,
  getUserOrders,
};
