const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   CORS & BODY PARSER
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

/* =========================
   Routes
========================= */
const authRoutes = require("./routes/auth.routes");
const receiverRoutes = require("./routes/receiver.routes");
const donorRoutes = require("./routes/donor.routes");
const adminRoutes = require("./routes/admin.routes");

app.use("/api/auth", authRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   Health Check
========================= */
app.get("/", (req, res) => {
  res.json({ message: "Blood Bank API is running" });
});

module.exports = app;
