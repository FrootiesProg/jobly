import React, { useState, useEffect } from "react";
import "./CompanyDetails.css";
import JoblyAPI from "../api/api";

function CompanyDetails({ companyId }) {
  const [company, setCompany] = useState({});
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const companyData = await JoblyAPI.getCompany(companyId);
        setCompany(companyData);

        const companyJobs = await JoblyAPI.getJobsForCompany(companyId);
        setJobs(companyJobs);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    }

    fetchCompanyDetails();
  }, [companyId]);

  const handleApply = async (jobId) => {
    try {
      const success = await JoblyAPI.applyToJob(jobId);
      if (success) {
        setAppliedJobs((prevState) => {
          const newAppliedJobs = new Set(prevState);
          newAppliedJobs.add(jobId);
          return newAppliedJobs;
        });
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
            {appliedJobs.has(job.id) ? (
              <button className="applied">Applied</button>
            ) : (
              <button onClick={() => handleApply(job.id)}>Apply</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetails;
