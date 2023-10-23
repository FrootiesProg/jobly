import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";
import JoblyApi from "../api/api";
import "./Navbar.css";

function Navbar() {
  const { state, dispatch } = useUser();

  const handleLogout = async () => {
    try {
      await JoblyApi.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  let authLinks;

  if (state && state.isAuthenticated && state.user) {
    authLinks = (
      <>
        <p>Welcome, {state.user.username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else {
    authLinks = (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    );
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Jobly</Link>
          </li>
          <li>
            <Link to="/companies">Companies</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {authLinks}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
