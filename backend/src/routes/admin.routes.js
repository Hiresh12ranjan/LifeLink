const express = require("express");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");

const router = express.Router();

/* =========================
   Admin protection
========================= */
router.use(auth, role("admin"));

/* =========================
   Platform statistics
========================= */
router.get("/stats", async (req, res) => {
  try {
    const [
      donors,
      receivers,
      totalRequests,
      activeRequests,
      emergencyRequests,
    ] = await Promise.all([
      User.countDocuments({ role: "donor" }),
      User.countDocuments({ role: "receiver" }),
      BloodRequest.countDocuments(),
      BloodRequest.countDocuments({
        status: { $in: ["pending", "matched"] },
      }),
      BloodRequest.countDocuments({
        urgency: "emergency",
        status: { $in: ["pending", "matched"] },
      }),
    ]);

    res.json({
      users: { donors, receivers },
      requests: {
        total: totalRequests,
        active: activeRequests,
        emergencies: emergencyRequests,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
