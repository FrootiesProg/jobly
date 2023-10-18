import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet, Navigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Companies from "./components/Companies";
import Jobs from "./components/Jobs";
import JoblyApi from "./api/api";
import CompanyDetails from "./components/CompanyDetails";
import AppliedJobs from "./components/AppliedJobs";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await JoblyApi.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }

    checkAuth();
  }, []);

  const handleLogin = async (userData, navigate) => {
    try {
      const response = await JoblyApi.login(userData);
      if (response.success) {
        setUser(response.user);
        navigate("/profile");
      } else {
        console.error("Login failed:", response.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async (navigate) => {
    try {
      await JoblyApi.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <Router>
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:companyId" element={<CompanyDetails />} />
          <Route
            path="/jobs"
            element={
              <Outlet>
                <Jobs />
              </Outlet>
            }
          />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
