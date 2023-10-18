import React, { useState, useEffect } from "react";
import JoblyAPI from "../api/api";
import "./Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsData = await JoblyAPI.getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    async function fetchAppliedJobs() {
      try {
        const appliedJobsData = await JoblyAPI.getAppliedJobs();
        setAppliedJobs(new Set(appliedJobsData));
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    }

    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const response = await JoblyAPI.applyToJob(jobId);

      if (response) {
        console.log("Applied to job with ID:", jobId);
        setAppliedJobs(new Set(appliedJobs).add(jobId));
      } else {
        console.error("Failed to apply to job with ID:", jobId);
      }
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  return (
    <div className="jobs">
      <h2>Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>Salary: {job.salary}</p>
            <p>Company: {job.companyHandle}</p>
            <button
              onClick={() => handleApply(job.id)}
              disabled={appliedJobs.has(job.id)}
            >
              {appliedJobs.has(job.id) ? "Applied" : "Apply"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jobs;
