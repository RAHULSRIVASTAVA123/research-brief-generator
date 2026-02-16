// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import briefRoutes from "./routes/briefRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/brief", briefRoutes);

// app.get("/api/status", async (req, res) => {
//   try {
//     const dbStatus = mongoose.connection.readyState === 1;
//     res.json({
//       server: "running",
//       database: dbStatus ? "connected" : "disconnected",
//       llm: process.env.OPENAI_API_KEY ? "configured" : "missing"
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Status check failed" });
//   }
// });

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(5000, () => console.log("Server running on port 5000"));
//   })
//   .catch(err => console.error(err));
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import briefRoutes from "./routes/briefRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();

const app = express();   // ✅ MUST come before app.use

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/brief", briefRoutes);
app.use("/api/status", statusRoutes);   // ✅ Now safe

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});