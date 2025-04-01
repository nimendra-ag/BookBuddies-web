import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserModel } from './models/User.js';
// const {connect} = require('mongoose'); // connect is a function that connects to the MongoDB database

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: 'http://51.21.202.75:3000'})); // cors() is a middleware that enables cross-origin resource sharing
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

app.post('/signup', async (req, res) => {
  const { email, password, username, nic, gender } = req.body;

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ 
        success: false, 
        error: "User already exists with this email address" 
      });
    }

    const newUser = new UserModel({
      email,
      password,
      username,
      nic,
      gender
    });

    const result = await newUser.save();
    
    const token = jwt.sign(
      { _id: result._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    return res.status(201).json({ 
      success: true, 
      token,
      id: result._id 
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ 
      success: false, 
      error: "Internal server error during signup" 
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found"
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        success: false,
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    return res.status(200).json({
      success: true,
      token
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error during login"
    });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000,'0.0.0.0', () => console.log(`Server is running on port ${process.env.PORT || 5000}`));
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
