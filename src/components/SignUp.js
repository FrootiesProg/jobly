import React, { useState } from "react";
import JoblyApi from "../api/api";
import { useUser } from "./UserContext"; // Import the UserContext

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  // Get the user state and dispatch function from the UserContext
  const { dispatch } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any previous form errors
    setFormErrors([]);

    try {
      // Use the states to create a data object to send to the API
      const userData = {
        firstName,
        lastName,
        email,
        password,
      };

      // Call the API to submit the user registration
      const response = await JoblyApi.signup(userData);

      // Handle success or show any form-specific errors
      if (response.success) {
        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(response.user));
        // Dispatch the "LOGIN" action to update the user state
        dispatch({ type: "LOGIN", user: response.user });
        // Redirect or show a success message
      } else {
        // Check if response.errors is an array, or provide an empty array as a default
        const errors = response.errors || [];
        setFormErrors(errors);
      }
    } catch (error) {
      // Handle API request error
      console.error("Error submitting registration:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {
          /* Display form errors, if any */
          formErrors.length > 0 && (
            <div className="error-messages">
              {formErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )
        }
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
