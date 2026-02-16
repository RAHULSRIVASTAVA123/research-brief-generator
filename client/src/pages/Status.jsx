// import { useEffect, useState } from "react";
// import axios from "axios";

// function Status() {
//   const [status, setStatus] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/status")
//       .then(res => setStatus(res.data))
//       .catch(() => setStatus({ error: "Backend not reachable" }));
//   }, []);

//   return (
//     <div>
//       <h2>Status Page</h2>
//       <pre>{JSON.stringify(status, null, 2)}</pre>
//     </div>
//   );
// }

// export default Status;

import { useEffect, useState } from "react";

export default function Status() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then(res => res.json())
      .then(data => setStatus(data));
  }, []);

  if (!status) return <p>Checking status...</p>;

  return (
    <div>
      <h2>System Status</h2>
      <p>Server: {status.server}</p>
      <p>Database: {status.database}</p>
      <p>LLM: {status.llm}</p>
    </div>
  );
}