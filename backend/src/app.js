import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors(({
 origin: process.env.CLIENT_URL?.split(",") || [
  "http://localhost:5173"
],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
})));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
