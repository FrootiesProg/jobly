import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyAPI from "../api/api";
import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For filtering

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companiesData = await JoblyAPI.getCompanies(searchTerm);
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
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
              <Link to={`/companies/${company.id}`}>{company.name}</Link>
            </h3>
            <p>{company.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
