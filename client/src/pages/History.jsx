// import { useEffect, useState } from "react";
// import axios from "axios";
// import BriefCard from "../components/BriefCard";

// function History() {
//   const [briefs, setBriefs] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/brief")
//       .then(res => setBriefs(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Last 5 Research Briefs</h2>
//       {briefs.map((brief, i) => (
//         <BriefCard key={i} brief={brief} />
//       ))}
//     </div>
//   );
// }

// export default History;

import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [briefs, setBriefs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/brief")
      .then(res => setBriefs(res.data));
  }, []);

  return (
    <div>
      <h1>Last 5 Research Briefs</h1>
      {briefs.map(b => (
        <div key={b._id}>
          <p>{b.summary.slice(0, 120)}...</p>
        </div>
      ))}
    </div>
  );
}