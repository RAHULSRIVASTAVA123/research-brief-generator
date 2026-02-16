function BriefCard({ brief }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Summary</h2>
      <p>{brief.summary}</p>

      <h2>Key Points</h2>
      <ul>
        {brief.keyPoints.map((kp, index) => (
          <li key={index}>
            <strong>{kp.point}</strong>
            <br />
            <em>Source:</em> {kp.sourceUrl}
            <br />
            <em>Snippet:</em> {kp.snippet}
          </li>
        ))}
      </ul>

      <h2>Conflicting Claims</h2>
      <ul>
        {brief.conflictingClaims.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <h2>What to Verify</h2>
      <ul>
        {brief.verificationChecklist.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export default BriefCard;