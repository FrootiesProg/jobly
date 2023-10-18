import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet, // Move Outlet import here
} from "react-router-dom";

import UserContext from "./components/UserContext";
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
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  const [user, setUser] = useState(null);
  const [navigateTo, setNavigateTo] = useState(null);

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

  useEffect(() => {
    if (navigateTo) {
      setNavigateTo(null);
    }
  }, [navigateTo]);

  const handleLogin = async (userData) => {
    try {
      const response = await JoblyApi.login(userData);
      if (response.success) {
        setUser(response.user);
        setNavigateTo("/profile");
      } else {
        console.error("Login failed:", response.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await JoblyApi.logout();
      setUser(null);
      setNavigateTo("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <UserContext.Provider value={{ state: { isAuthenticated: !!user } }}>
        <Router>
          <NavBar user={user} onLogout={handleLogout} navigateTo={navigateTo} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute user={user} onLogout={handleLogout}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:companyId" element={<CompanyDetails />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
