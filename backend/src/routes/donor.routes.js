const express = require("express");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const {
  toggleAvailability,
  getMatchingRequests,
  acceptRequest,
  getPersonalRequests,
  respondPersonalRequest,
} = require("../controllers/donor.controller");

const router = express.Router();

/* =========================
   Donor Protected Routes
========================= */
router.use(auth, role("donor"));

/* Availability */
router.patch("/availability", toggleAvailability);

/* Broadcast Requests */
router.get("/requests", getMatchingRequests);
router.patch("/request/:id/accept", acceptRequest);

/* 🔥 PERSONAL REQUESTS */
router.get("/personal-requests", getPersonalRequests);
router.patch("/personal-request/:id/respond", respondPersonalRequest);

module.exports = router;
