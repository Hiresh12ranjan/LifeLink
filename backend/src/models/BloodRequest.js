const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    units: {
      type: Number,
      required: true,
      min: 1,
    },

    city: {
      type: String,
      required: true,
    },

    hospitalName: {
      type: String,
      required: true,
    },

    urgency: {
      type: String,
      enum: ["normal", "urgent", "emergency"],
      default: "normal",
    },

    status: {
      type: String,
      enum: ["pending", "matched", "fulfilled", "cancelled"],
      default: "pending",
    },

    // 🔔 Donors who were notified
    notifiedDonors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ✅ Donors who accepted
    acceptedDonors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
