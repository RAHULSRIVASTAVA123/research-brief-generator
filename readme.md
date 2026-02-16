# Research Brief Generator

A full-stack web application that generates structured research briefs from multiple URLs using LLM-powered analysis.

---

## 🚀 Overview

This app allows users to:

- Paste 5–10 URLs (articles, blogs, docs)
- Automatically fetch and clean their content
- Generate a structured research brief including:
  - Summary
  - Key Points (with citations and snippets)
  - Conflicting Claims
  - “What to Verify” Checklist
  - Topic Tags
- View the last 5 generated briefs
- Check system health via a status page

---

## 🏗 Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Router

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)
- Groq LLM API

---

## 📦 Project Structure


## server(backend)
cd server
npm install
npx nodemon server.js

## client(Frontend)
cd client
npm install
npm run dev

### Core Requirements

- Multi-URL input (1–10 URLs)
- Fetch and clean article content
- LLM-powered research brief generation
- Structured JSON parsing
- Summary generation
- Key points with:
  - Source link
  - Snippet
- Conflicting claims detection
- “What to verify” checklist
- Topic tag extraction
- Display all sources used
- Save last 5 briefs in MongoDB

---

### Additional Features 



#  LLM Integration

Provider: **Groq**  
Model: `llama-3.3-70b-versatile`

The model is prompted to return STRICT JSON output to ensure reliable parsing.

JSON parsing includes safety handling:
- Removes markdown code blocks if present
- Catches malformed responses
- Returns structured error if parsing fails


- Topic Tags
- Confidence score (optional if implemented)
- System Status Page
- Automatic deletion of older briefs (keeps last 5)
- Basic error handling for:
  - Empty input
  - Invalid URL
  - LLM failure
  - Database failure
 
Few Url exaple you can check:
https://en.wikipedia.org/wiki/Artificial_intelligence
https://en.wikipedia.org/wiki/Machine_learning
https://www.ietf.org/rfc/rfc2616.txt


Deployment Link---https://research-brief-generator-omega.vercel.app/

