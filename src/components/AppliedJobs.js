import React, { useState, useEffect } from "react";
import Jobs from "./Jobs";
import JoblyApi from "../api/api";

function ParentComponent() {
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  // Fetch applied jobs when the component mounts
  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const appliedJobsData = await JoblyApi.getAppliedJobs();
        setAppliedJobs(new Set(appliedJobsData));
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    }

    fetchAppliedJobs();
  }, []);

  return (
    <div>
      <Jobs appliedJobs={appliedJobs} />
    </div>
  );
}

export default ParentComponent;
