import express from "express";
import mongoose from "mongoose";
import Groq from "groq-sdk";

const router = express.Router();

router.get("/", async (req, res) => {
  let dbStatus = "disconnected";
  let llmStatus = "disconnected";

  // Check MongoDB
  if (mongoose.connection.readyState === 1) {
    dbStatus = "connected";
  }

  // Check LLM
  try {
    if (process.env.GROQ_API_KEY) {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Say OK" }],
        max_tokens: 5
      });

      llmStatus = "connected";
    }
  } catch (err) {
    llmStatus = "error";
  }

  res.json({
    server: "running",
    database: dbStatus,
    llm: llmStatus
  });
});

export default router;