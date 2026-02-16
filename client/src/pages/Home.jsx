// import { useState } from "react";
// import axios from "axios";
// import BriefCard from "../components/BriefCard";
// import Loader from "../components/Loader";

// function Home() {
//   const [urls, setUrls] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [brief, setBrief] = useState(null);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     const urlArray = urls.split("\n").filter(u => u.trim() !== "");

//     if (urlArray.length === 0) {
//       setError("Please enter at least one URL");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post(
//         "http://localhost:5000/api/brief",
//         { urls: urlArray }
//       );

//       setBrief(res.data);
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Paste 5–10 URLs (one per line)</h2>

//       <textarea
//         rows="8"
//         style={{ width: "100%" }}
//         value={urls}
//         onChange={(e) => setUrls(e.target.value)}
//       />

//       <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
//         Generate Brief
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <Loader />}
//       {brief && <BriefCard brief={brief} />}
//     </div>
//   );
// }

// export default Home;

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [urls, setUrls] = useState("");
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setBrief(null);

    if (!urls.trim()) {
      setError("Please enter at least one URL.");
      return;
    }

    const urlArray = urls
      .split("\n")
      .map(u => u.trim())
      .filter(u => u.length > 0);

    if (urlArray.length < 1) {
      setError("Provide at least one valid URL.");
      return;
    }

    if (urlArray.length > 10) {
      setError("Maximum 10 URLs allowed.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://research-brief-generator-wmn3.onrender.com/api/brief",
        { urls: urlArray }
      );

      setBrief(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1>Research Brief Generator</h1>

      <p>Paste 5–10 URLs (one per line)</p>

      <textarea
        rows="6"
        value={urls}
        onChange={e => setUrls(e.target.value)}
        placeholder="https://example.com/article"
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Brief"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
      )}

      {brief && (
        <div style={{ marginTop: "40px" }}>
          
          {/* TAGS */}
          {brief.tags?.length > 0 && (
            <>
              <h2>Topic Tags</h2>
              <div style={{ marginBottom: "20px" }}>
                {brief.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      background: "#333",
                      borderRadius: "5px"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* SUMMARY */}
          <h2>Summary</h2>
          <p>{brief.summary}</p>

          {/* KEY POINTS */}
          <h2>Key Points</h2>
          {brief.keyPoints.map((kp, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <p><strong>{kp.point}</strong></p>

              <p>
                Source:{" "}
                <a
                  href={kp.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {kp.sourceUrl}
                </a>
              </p>

              <p><em>Snippet:</em> {kp.snippet}</p>
            </div>
          ))}

          {/* CONFLICTING CLAIMS */}
          <h2>Conflicting Claims</h2>
          {brief.conflictingClaims?.length === 0 ? (
            <p>No conflicting claims detected.</p>
          ) : (
            <ul>
              {brief.conflictingClaims.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          )}

          {/* WHAT TO VERIFY */}
          <h2>What to Verify</h2>
          {brief.verificationChecklist?.length === 0 ? (
            <p>No verification checklist provided.</p>
          ) : (
            <ul>
              {brief.verificationChecklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {/* SOURCES USED */}
          <h2>Sources Used</h2>
          {brief.sources.map((s, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                {s.url}
              </a>
              <p style={{ opacity: 0.8 }}>
                {s.textPreview}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
