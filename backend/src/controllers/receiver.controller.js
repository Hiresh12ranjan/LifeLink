const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");
const PersonalRequest = require("../models/PersonalRequest");

/* =========================
   Create Blood Request
========================= */
exports.createBloodRequest = async (req, res) => {
  try {
    const { bloodGroup, units, city, hospitalName, urgency } = req.body;

    const receiver = await User.findById(req.user.id);
    if (!receiver || receiver.role !== "receiver") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!bloodGroup || !units || !city || !hospitalName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Only ONE active request allowed
    const existingRequest = await BloodRequest.findOne({
      receiver: receiver._id,
      status: { $in: ["pending", "matched"] },
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already have an active blood request",
      });
    }

    const request = await BloodRequest.create({
      receiver: receiver._id,
      bloodGroup,
      units,
      city,
      hospitalName,
      urgency: urgency || "normal",
      status: "pending",
    });

    // 🔔 Notify donors via Socket.io
    const { getIo } = require("../socket");
    try {
      const io = getIo();
      io.to(bloodGroup).emit("request_created", request);
    } catch (err) {
      console.error("Socket emit error:", err);
    }

    res.status(201).json({
      message: "Blood request created successfully",
      request,
    });
  } catch (error) {
    console.error("Create request error:", error);
    res.status(500).json({ message: "Failed to create blood request" });
  }
};

/* =========================
   Get My Requests
========================= */
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      receiver: req.user.id,
    })
      .populate("acceptedDonors", "name phone bloodGroup location")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Fetch requests error:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

/* =========================
   Cancel Blood Request
========================= */
exports.cancelRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request || request.receiver.toString() !== req.user.id) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "fulfilled") {
      return res.status(400).json({
        message: "Cannot cancel a fulfilled request",
      });
    }

    request.status = "cancelled";
    await request.save();

    res.json({ message: "Request cancelled" });
  } catch (error) {
    console.error("Cancel request error:", error);
    res.status(500).json({ message: "Failed to cancel request" });
  }
};

/* =========================
   Get Available Donors
========================= */
exports.getAvailableDonors = async (req, res) => {
  try {
    const donors = await User.find({
      role: "donor",
      isAvailable: true,
    }).select("name bloodGroup phone location isAvailable lastDonation");

    res.json(donors);
  } catch (error) {
    console.error("Fetch donors error:", error);
    res.status(500).json({ message: "Failed to fetch donors" });
  }
};

/* =========================
   Send Personal Request
========================= */
exports.sendPersonalRequest = async (req, res) => {
  try {
    const { donorId, message } = req.body;

    const receiver = await User.findById(req.user.id);
    if (!receiver || receiver.role !== "receiver") {
      return res.status(403).json({ message: "Access denied" });
    }

    const donor = await User.findOne({
      _id: donorId,
      role: "donor",
      isAvailable: true,
    });

    if (!donor) {
      return res.status(404).json({ message: "Donor not available" });
    }

    if (!donor.bloodGroup) {
      return res.status(400).json({ message: "Donor does not have a blood group specified" });
    }

    const existing = await PersonalRequest.findOne({
      receiver: receiver._id,
      donor: donor._id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "Personal request already sent",
      });
    }

    const request = await PersonalRequest.create({
      receiver: receiver._id,
      donor: donor._id,
      bloodGroup: donor.bloodGroup,
      message: message || "Need blood donation help",
    });

    // 🔔 Notify specific donor
    const { getIo } = require("../socket");
    try {
      const io = getIo();
      io.to(donor._id.toString()).emit("personal_request", request);
    } catch (err) {
      console.error("Socket emit error:", err);
    }

    res.status(201).json({
      message: "Personal request sent successfully",
      request,
    });
  } catch (error) {
    console.error("Send personal request error:", error);
    res.status(500).json({ message: "Failed to send personal request" });
  }
};

/* =========================
   Get My Personal Requests
========================= */
exports.getMyPersonalRequests = async (req, res) => {
  try {
    const requests = await PersonalRequest.find({
      receiver: req.user.id,
    })
      .populate("donor", "name phone bloodGroup location")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Fetch personal requests error:", error);
    res.status(500).json({ message: "Failed to fetch personal requests" });
  }
};
