import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try{
      const user = await User.findOne({email})

      
    // 1. If no user found → redirect to register
      if(!user){
        return res.status(404).json({
         code: "USER_NOT_FOUND",
        message: "No account found. Please register first."
        })
      }
      
    // 2. If password doesn’t match
      const isMatch = await user.matchPassword(password)
      if(!isMatch){
        return res.status(401).json({
          code: "INVALID_PASSWORD",
          message: "Invalid password"
       })
      }

      // 3. Successful login
      return res.json({
        code: "LOGIN_SUCCESS",
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } catch(error){
        console.error("Login error:", error);
        res.status(500).json({
        code: "SERVER_ERROR",
        message: "Something went wrong. Please try again later."
       }) }
}

