import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, async (req, res) => {
  try {
    // req.user is already set by your protect middleware
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
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
});

export default router;
