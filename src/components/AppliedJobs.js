import React, { useState, useEffect } from "react";
import Jobs from "./Jobs";
import JoblyApi from "../api/api";
import "./AppliedJobs.css";

function AppliedJobsContainer() {
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);


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

  const handleButtonClick = () => {

    setButtonPressed(!buttonPressed);
  };

  return (
    <div className="container">
      <h2>Applied Jobs</h2>
      <button
        className={buttonPressed ? "pressed" : ""}
        onClick={handleButtonClick}
      >
        Apply
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Jobs appliedJobs={appliedJobs} />
    </div>
  );
}

export default AppliedJobsContainer;
