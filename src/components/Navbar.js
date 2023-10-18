import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext"; // Import your user context
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  const { state } = useUser(); // Get user state

  // Handle user logout
  const handleLogout = () => {
    // Call the logout function (if available in your API) and perform any necessary actions
    // Example:
    // JoblyApi.logout().then(() => {
    //   // Redirect to the login page or perform other actions
    //   history.push('/login');
    // });
  };

  // Render login, signup, or username and logout links based on authentication status
  const authLinks = state.isAuthenticated ? (
    <>
      <p>Welcome, {state.user.username}!</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </>
  );

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
