const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    healthId: { type: String, required: true, unique: true }, // <-- Add this
    name: { type: String, default: "" }, 
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bloodGroup: String,
    conditions: String,
    medications: String,
    allergies: String,
    emergencyName: String,
    emergencyPhone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
