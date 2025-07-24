import mongoose from "mongoose";

// 1- Mongoose is an ODM (Object Data Modeling) library for MongoDB.
// 2- It allows you to define schemas, models, and connect to MongoDB easily.

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Atlas MongoDB connected: ${conn.connection.host}`);
    // console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("DB Error: ", err);
    process.exit(1);
  }
};

export default connectDB;
