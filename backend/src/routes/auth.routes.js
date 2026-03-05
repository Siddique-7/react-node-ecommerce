import express from "express";
import { registerUser, loginUser, getProfile, updateProfile, changePassword } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile/password", protect, changePassword);

export default router;
