// CompanyDetails.js
import React, { useState, useEffect } from "react";
import JoblyAPI from "../api/api";

function CompanyDetails({ companyId }) {
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [appliedJobId, setAppliedJobId] = useState(null); // Track the applied job ID

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const companyData = await JoblyAPI.getCompany(companyId);
        setCompany(companyData);

        const companyJobs = await JoblyAPI.getJobs();
        setJobs(companyJobs);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    }

    fetchCompanyDetails();
  }, [companyId]);

  const handleApply = async (jobId) => {
    try {
      const success = await JoblyAPI.applyToJob(companyId, jobId);
      if (success) {
        setAppliedJobId(jobId); // Update the applied job ID
      }
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  return (
    <div className="company-details">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <h3>Job Positions:</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h4>{job.title}</h4>
            <p>Salary: {job.salary}</p>
            <p>{job.company}</p>
            {appliedJobId === job.id ? (
              <p>Applied</p>
            ) : (
              <button
                onClick={() => handleApply(job.id)}
                disabled={appliedJobId !== null}
              >
                Apply
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetails;
