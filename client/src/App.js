import React from "react";
import "./App.css";

import Jobs from "./Jobs";

const JOB_API_URL = '/v1/api/jobs';

// const joblist = [
//   { title: "SWE1", company: "Gobble" },
//   { title: "SWE1", company: "Fobble" },
//   { title: "SWE1", company: "Aobble" }
// ];

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  const jsonJobs = await res.json();
  updateCb(jsonJobs);
  //console.log({jsonJobs});
}

function App() {
  
  const [jobList, updateJobs] = React.useState([]);

  // will act like a componentDidMount
  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, [])

  return (
    <div className="App">
      <Jobs joblist={jobList} />
    </div>
  );
}

export default App;
