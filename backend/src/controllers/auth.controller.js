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

// Get Profile
export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone,
        address: req.user.address,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    console.log("❌ Profile fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const user = req.user; // from protect middleware

    const { name, phone, address } = req.body;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;

    if (address) {
      user.address = {
        street: address.street || user.address?.street,
        city: address.city || user.address?.city,
        state: address.state || user.address?.state,
        postalCode: address.postalCode || user.address?.postalCode,
        country: address.country || user.address?.country,
      };
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
      }
    });

  } catch (error) {
    console.error("Profile update error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Password
export const changePassword = async (req, res) => {
  try {
    const user = req.user;

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new password are required"
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password"
      });
    }  

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    user.password = newPassword; // assuming you hash in pre-save middleware

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error("Password change error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};