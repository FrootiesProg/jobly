import React, { useState } from "react";
import JoblyApi from "../api/api";
import { useUser } from "./UserContext";
import Alert from "./Alert";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);


  const handleSubmit = async (e) => {
    console.log("handleSubmit triggered"); 
    e.preventDefault();
    setFormErrors([]);

    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    console.log("Data being sent to API:", userData);

    try {
      const response = await JoblyApi.signup(userData);

      console.log("Response from API:", response); 

      if (response.success) {
        console.log("Registration successful");
        alert("Sign up successful. Please log in.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else {
        const errors = response.errors || [];
        setFormErrors(errors);
      }
    } catch (error) {
      console.error("Error during signup submission:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {formErrors.length > 0 && <Alert type="danger" messages={formErrors} />}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
