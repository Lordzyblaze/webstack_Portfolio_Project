const mongoose = require("mongoose");

// create schema

const userSchema = new mongoose.Schema(
    {
        firstname:{
          type: String,
      required: [true, "First Name is required"],
        },
      lastname:{
        type: String,
        required: [true, "Last Name is required"],
        },
        email:{
          type: String,
      required: [true, "Email is required"],
        },
        Password:{
          type: String,
      required: [true, "Password is required"],
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
    });
        const user = mongoose.model ("user",userSchema);
        module.exports = user;
