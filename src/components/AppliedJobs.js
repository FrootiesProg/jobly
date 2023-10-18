import React, { useState, useEffect } from "react";
import Jobs from "./Jobs";
import JoblyApi from "../api/api";

function AppliedJobsContainer() {
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applied jobs when the component mounts
  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const appliedJobsData = await JoblyApi.getAppliedJobs();
        setAppliedJobs(new Set(appliedJobsData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setError("Error fetching applied jobs. Please try again later.");
        setIsLoading(false);
      }
    }

    fetchAppliedJobs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Jobs appliedJobs={appliedJobs} />
    </div>
  );
}

export default AppliedJobsContainer;
