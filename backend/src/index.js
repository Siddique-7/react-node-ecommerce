import "./config/env.js";
import app from "./app.js";
import connectDB from "./db/connectDB.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("❌ Failed to connect to DB", err);
});
