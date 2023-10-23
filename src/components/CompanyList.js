import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <Link to={`/companies/${company.id}`}>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
      </Link>
    </div>
  );
}

export default CompanyCard;
