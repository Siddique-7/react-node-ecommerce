import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String }
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },

    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { 
      type: String, 
      required: true 
    },

    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },

    phone: {
      type: String,
      trim: true,
      match: /^[0-9]{10}$/,
    },

    address: addressSchema

  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
