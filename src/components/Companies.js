import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyAPI from "../api/api";
import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]); // Add a state for jobs
  const [searchTerm, setSearchTerm] = useState(""); // For filtering

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companiesData = await JoblyAPI.getCompanies(searchTerm);
        setCompanies(companiesData);

        //  have a method to fetch all jobs
        const jobsData = await JoblyAPI.getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching companies or jobs:", error);
      }
    }

    fetchCompanies();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleApply = (jobId) => {
    // Implement the logic for applying to a job here
  };

  return (
    <div className="companies">
      <h2>Companies</h2>
      <div className="search-bar">
        <label htmlFor="company-search">Search:</label>
        <input
          type="text"
          id="company-search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <h3>
              <Link to={`/companies/${company.handle}`}>{company.name}</Link>
            </h3>
            <p>{company.description}</p>
          </li>
        ))}
        {jobs.map((job) => (
          <li key={job.id}>
            <h4>{job.title}</h4>
            <p>Salary: {job.salary}</p>
            <p>{job.company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
