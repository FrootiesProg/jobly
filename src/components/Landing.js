import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"; 

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome to Jobly</h1>
      <p>Your source for finding the perfect job</p>
      <div className="landing-buttons">
        <Link to="/login" className="landing-button login-button">
          Login
        </Link>
        <Link to="/signup" className="landing-button signup-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
