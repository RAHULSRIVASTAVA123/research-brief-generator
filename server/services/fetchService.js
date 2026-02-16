import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export const fetchAndClean = async (url) => {
  try {
    // First attempt: normal fetch
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9"
      },
      timeout: 15000
    });

    return extractReadable(response.data, url);

  } catch (err) {
    console.log("Primary fetch failed, trying textise fallback...");

    try {
      // Fallback using textuploader (works for many blocked sites)
      const fallbackUrl = `https://textuploader.com/convert?url=${encodeURIComponent(url)}`;
      const fallbackRes = await axios.get(fallbackUrl);

      return extractReadable(fallbackRes.data, url);

    } catch (fallbackErr) {
      throw new Error(`Failed to fetch or parse: ${url}`);
    }
  }
};

const extractReadable = (html, url) => {
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article || !article.textContent) {
    throw new Error("No readable article content found");
  }

  return {
    url,
    title: article.title || "",
    text: article.textContent.slice(0, 6000)
  };
};