// import express from "express";
// import Brief from "../models/Brief.js";
// import { fetchAndClean } from "../services/fetchService.js";
// import { generateBrief } from "../services/llmService.js";

// const router = express.Router();

// // Create research brief
// router.post("/", async (req, res) => {
//   try {
//     const { urls } = req.body;

//     if (!urls || !Array.isArray(urls) || urls.length < 1) {
//       return res.status(400).json({ error: "Provide at least one valid URL" });
//     }

//     const sources = [];

//     for (let url of urls.slice(0, 10)) {
//       try {
//         const cleaned = await fetchAndClean(url);
//         sources.push(cleaned);
//       } catch (err) {
//         console.error("❌ Fetch failed for:", url);
//         console.error(err.message);
//       }
//     }

//     if (sources.length === 0) {
//       return res.status(400).json({
//         error: "Failed to extract readable content from provided URLs"
//       });
//     }

//     const aiResult = await generateBrief(sources);

//     const formattedKeyPoints = (aiResult.keyPoints || []).map(kp => ({
//       point: kp.point,
//       sourceUrl: sources[kp.sourceNumber - 1]?.url || "",
//       snippet: kp.snippet
//     }));

//     const newBrief = await Brief.create({
//       summary: aiResult.summary || "",
//       keyPoints: formattedKeyPoints,
//       conflictingClaims: aiResult.conflictingClaims || [],
//       verificationChecklist: aiResult.verificationChecklist || [],
//       sources
//     });

//     // Keep only last 5 briefs
//     const count = await Brief.countDocuments();
//     if (count > 5) {
//       const oldest = await Brief.findOne().sort({ createdAt: 1 });
//       if (oldest) {
//         await Brief.findByIdAndDelete(oldest._id);
//       }
//     }

//     res.json(newBrief);

//   } catch (err) {
//     console.error("🔥 BRIEF GENERATION ERROR:", err);
//     res.status(500).json({ error: err.message || "Internal server error" });
//   }
// });

// // Get last 5 briefs
// router.get("/", async (req, res) => {
//   try {
//     const briefs = await Brief.find()
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json(briefs);
//   } catch (err) {
//     console.error("History fetch error:", err);
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// export default router;

import express from "express";
import Brief from "../models/Brief.js";
import { fetchAndClean } from "../services/fetchService.js";
import { generateBrief } from "../services/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls) || urls.length < 1) {
      return res.status(400).json({ error: "Provide at least one valid URL" });
    }

    const sources = [];

    for (let url of urls.slice(0, 10)) {
      const cleaned = await fetchAndClean(url);

      sources.push({
        url: cleaned.url,
        text: cleaned.text,
        textPreview: cleaned.text.substring(0, 300)
      });
    }

    const aiResult = await generateBrief(sources);

    const formattedKeyPoints = aiResult.keyPoints.map(kp => ({
      point: kp.point,
      sourceUrl: sources[kp.sourceNumber - 1]?.url || "",
      snippet: kp.snippet
    }));

    const newBrief = await Brief.create({
      summary: aiResult.summary,
      keyPoints: formattedKeyPoints,
      conflictingClaims: aiResult.conflictingClaims || [],
      verificationChecklist: aiResult.verificationChecklist || [],
      tags: aiResult.tags || [],
      sources: sources.map(s => ({
        url: s.url,
        textPreview: s.textPreview
      }))
    });

    // Keep only last 5
    const count = await Brief.countDocuments();
    if (count > 5) {
      const oldest = await Brief.findOne().sort({ createdAt: 1 });
      await Brief.findByIdAndDelete(oldest._id);
    }

    res.json(newBrief);

  } catch (err) {
    console.error("🔥 BRIEF GENERATION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const briefs = await Brief.find().sort({ createdAt: -1 }).limit(5);
  res.json(briefs);
});

export default router;