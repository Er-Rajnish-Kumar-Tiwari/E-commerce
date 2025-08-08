const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  verificationToken: String,

  addresses: [
    {
      name: String,
      street: String,
      city: String,
      postalCode: String,
      mobileNo: String,
      landmark: String,
      houseNo: String,
      country: String,
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
