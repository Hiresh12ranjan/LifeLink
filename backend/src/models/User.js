const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["donor", "receiver", "admin"],
      required: true,
    },
    bloodGroup: {
      type: String,
      required: function () {
        return this.role === "donor";
      },
    },
    city: String,
    area: String,
    phone: String,
    isAvailable: { type: Boolean, default: true },
    lastDonationDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
