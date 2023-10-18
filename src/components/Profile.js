import React, { useState } from "react"; // Removed 'useEffect' import
import JoblyApi from "../api/api";

function Profile({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    username: user.username,
    password: "",
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const updatedUser = await JoblyApi.updateProfile(formData);
      onUpdate(updatedUser); // Update the user data in the parent component
      // Optionally, you can show a success message
    } catch (error) {
      setFormErrors(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Render a loading state or handle the absence of user data
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {formErrors.length > 0 && (
        <div className="alert alert-danger">
          {formErrors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
