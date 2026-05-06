const express = require("express");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const {
  createBloodRequest,
  getMyRequests,
  cancelRequest,
  getAvailableDonors,
  sendPersonalRequest,
  getMyPersonalRequests,
} = require("../controllers/receiver.controller");

const router = express.Router();

/* =========================
   Receiver Protected Routes
========================= */
router.use(auth, role("receiver"));

router.post("/request", createBloodRequest);
router.get("/requests", getMyRequests);
router.patch("/request/:id/cancel", cancelRequest);

/* 🔥 REQUIRED FOR FindBlood PAGE */
router.get("/donors", getAvailableDonors);
router.post("/personal-request", sendPersonalRequest);
router.get("/personal-requests", getMyPersonalRequests);

module.exports = router;
