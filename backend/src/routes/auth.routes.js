import express from "express";

import { protect, isAdmin } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, getProfile, updateProfile, changePassword, getAllUsers } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/profile/password", protect, changePassword);

router.get("/admin/users", protect, isAdmin, getAllUsers);

export default router;
