import express from "express";
import { placeOrder, getUserOrders } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);        // Place order
router.get("/my-orders", protect, getUserOrders);  // User's orders

export default router;
