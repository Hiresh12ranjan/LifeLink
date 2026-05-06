const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");
const PersonalRequest = require("../models/PersonalRequest");

/* =========================
   Toggle Availability
========================= */
exports.toggleAvailability = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    donor.isAvailable = !donor.isAvailable;
    await donor.save();

    res.json({ isAvailable: donor.isAvailable });
  } catch (error) {
    res.status(500).json({ message: "Failed to update availability" });
  }
};

/* =========================
   Get Blood Requests (AUTO)
========================= */
exports.getMatchingRequests = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!donor.isAvailable) return res.json([]);

    const requests = await BloodRequest.find({
      bloodGroup: donor.bloodGroup,
      status: "pending",
    })
      .populate("receiver", "name phone city")
      .sort({ urgency: -1, createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Fetch donor requests error:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

/* =========================
   Accept Blood Request
========================= */
exports.acceptRequest = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!donor.isAvailable) {
      return res.status(400).json({ message: "Donor not available" });
    }

    const request = await BloodRequest.findById(req.params.id);

    if (!request || request.status !== "pending") {
      return res.status(404).json({ message: "Request not available" });
    }

    // Check if user already accepted
    if (request.acceptedDonors.includes(donor._id)) {
      return res.status(400).json({ message: "You already accepted this request" });
    }

    request.acceptedDonors.push(donor._id);

    // If we have enough donors, mark as matched/fulfilled
    if (request.acceptedDonors.length >= request.units) {
      request.status = "matched";
    }

    donor.lastDonationDate = new Date();

    await Promise.all([request.save(), donor.save()]);

    // 🔔 Notify receiver
    const { getIo } = require("../socket");
    try {
      const io = getIo();
      io.to(request.receiver.toString()).emit("request_accepted", {
        requestId: request._id,
        donor: {
          _id: donor._id,
          name: donor.name,
          phone: donor.phone,
          bloodGroup: donor.bloodGroup,
          location: {
            city: donor.city,
            area: donor.area,
          },
        },
      });
    } catch (err) {
      console.error("Socket emit error:", err);
    }

    res.json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({ message: "Failed to accept request" });
  }
};

/* =========================
   Get Personal Requests
========================= */
exports.getPersonalRequests = async (req, res) => {
  try {
    const donor = await User.findById(req.user.id);

    if (!donor || donor.role !== "donor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const requests = await PersonalRequest.find({
      donor: donor._id,
      status: "pending",
    })
      .populate("receiver", "name phone city")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Fetch personal requests error:", error);
    res.status(500).json({ message: "Failed to fetch personal requests" });
  }
};

/* =========================
   Respond to Personal Request
========================= */
exports.respondPersonalRequest = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await PersonalRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    request.status = status;
    await request.save();

    // 🔔 Notify receiver
    const { getIo } = require("../socket");
    try {
      const io = getIo();
      io.to(request.receiver.toString()).emit("personal_request_responded", {
        requestId: request._id,
        status,
        donorId: req.user.id,
      });
    } catch (err) {
      console.error("Socket emit error:", err);
    }

    res.json({ message: `Personal request ${status}` });
  } catch (error) {
    console.error("Respond personal request error:", error);
    res.status(500).json({ message: "Failed to respond to request" });
  }
};
