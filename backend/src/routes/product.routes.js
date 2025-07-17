import express from "express";

import {createProduct, getProducts, getProductById} from "../controllers/product.controller.js";
import { protect, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";


const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, isAdmin, upload.single("image"), createProduct);

export default router;
