// import Groq from "groq-sdk";

// export const generateBrief = async (sources) => {

//   const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY
//   });

//   const combinedText = sources.map(
//     (s, i) => `Source ${i + 1} (${s.url}):\n${s.text}\n`
//   ).join("\n\n");

//   const prompt = `
// Return ONLY valid raw JSON. No markdown. No explanation.

// Format:
// {
//   "summary": "",
//   "keyPoints": [
//     { "point": "", "sourceNumber": 1, "snippet": "" }
//   ],
//   "conflictingClaims": [],
//   "verificationChecklist": []
// }

// Sources:
// ${combinedText}
// `;

//   const response = await groq.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.2
//   });

//   let content = response.choices[0].message.content;

//   // Remove markdown fences
//   content = content.replace(/```json/gi, "");
//   content = content.replace(/```/g, "");
//   content = content.trim();

//   // Extract JSON block safely
//   const firstBrace = content.indexOf("{");
//   const lastBrace = content.lastIndexOf("}");

//   if (firstBrace !== -1 && lastBrace !== -1) {
//     content = content.substring(firstBrace, lastBrace + 1);
//   }

//   try {
//     return JSON.parse(content);
//   } catch (err) {
//     console.error("FINAL CLEANED OUTPUT:", content);
//     throw new Error("LLM parsing failed");
//   }
// };


import Groq from "groq-sdk";

export const generateBrief = async (sources) => {

  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY missing");
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const combinedText = sources
    .map((s, i) => `Source ${i + 1} (${s.url}):\n${s.text}`)
    .join("\n\n");

  const prompt = `
You are an expert research analyst.

Using the sources below, generate:

1. A concise summary (max 200 words)
2. Key points (each must reference source number and include a short snippet)
3. Any conflicting claims
4. A "What to verify" checklist
5. 3–5 topic tags (short keywords)

Return STRICT JSON only in this format:

{
  "summary": "",
  "keyPoints": [
    { "point": "", "sourceNumber": 1, "snippet": "" }
  ],
  "conflictingClaims": [],
  "verificationChecklist": [],
  "tags": []
}

Sources:
${combinedText}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  let content = response.choices[0].message.content;

  // Remove markdown code blocks if present
  content = content.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error("Invalid JSON from LLM:", content);
    throw new Error("LLM parsing failed");
  }
};