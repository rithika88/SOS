const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register user
router.post("/register", async (req, res) => {
  try {
    const healthId = "EHID-" + Math.floor(Math.random() * 1000000);

    const user = new User({ healthId, ...req.body });
    await user.save();

    res.json({ success: true, healthId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login user (by phone + password)
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone, password });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, healthId: user.healthId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Update user details
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { healthId: id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Get user by Health ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ healthId: req.params.id });
    if (!user) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
