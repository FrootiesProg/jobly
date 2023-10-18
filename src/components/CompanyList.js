
import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyAPI from "../api/api";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="company-list">
      <h2>Companies</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="companies">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
