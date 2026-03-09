import express from "express";

import { protect, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

router.get("/admin/all", protect, isAdmin, getAllOrders);

export default router;