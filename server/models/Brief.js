// import mongoose from "mongoose";

// const SourceSchema = new mongoose.Schema({
//   url: String,
//   title: String,
//   extractedText: String,
//   usedSnippets: [String]
// });

// const BriefSchema = new mongoose.Schema({
//   summary: String,
//   keyPoints: [
//     {
//       point: String,
//       sourceUrl: String,
//       snippet: String
//     }
//   ],
//   conflictingClaims: [String],
//   verificationChecklist: [String],
//   sources: [SourceSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model("Brief", BriefSchema);


import mongoose from "mongoose";

const briefSchema = new mongoose.Schema(
  {
    summary: String,
    keyPoints: [
      {
        point: String,
        sourceUrl: String,
        snippet: String
      }
    ],
    conflictingClaims: [String],
    verificationChecklist: [String],
    tags: [String],
    sources: [
      {
        url: String,
        textPreview: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Brief", briefSchema);