import React, { useState } from "react";
import "./Login.css";
import JoblyApi from "../api/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors([]);

    try {
      const loginData = {
        username,
        password,
      };

      const response = await JoblyApi.login(loginData);

      if (response.success) {
        // Call the `onLogin` callback with the user data after successful login
        onLogin(response.user);
      } else if (Array.isArray(response.errors)) {
        // Check if errors is an array and not undefined
        setFormErrors(response.errors);
      } else if (response.message) {
        // Handle other types of errors, like displaying a message
        console.error("Error submitting login:", response.message);
        setFormErrors([response.message]);
      } else {
        // Handle unexpected errors here
        console.error("Error submitting login:", response);
        setFormErrors(["An unexpected error occurred. Please try again."]);
      }
    } catch (error) {
      // Handle API request error
      console.error("Error submitting login:", error);
      setFormErrors(["An unexpected error occurred. Please try again."]);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Display form errors, if any */}
        {formErrors && formErrors.length > 0 && (
          <div className="error-messages">
            {formErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
