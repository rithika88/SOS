const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Public route: Get emergency info by Health ID
router.get("/public/:healthId", async (req, res) => {
  try {
    const { healthId } = req.params;
    const user = await User.findOne({ healthId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send only safe info
    res.json({
      name: user.name,
      phone: user.phone,
      bloodGroup: user.bloodGroup,
      conditions: user.conditions,
      medications: user.medications,
      allergies: user.allergies,
      emergencyName: user.emergencyName,
      emergencyPhone: user.emergencyPhone,
      healthId: user.healthId
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
