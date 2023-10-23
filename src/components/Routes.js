import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Jobs from "./Jobs";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";

function AppRoutes({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login handleLogin={login} />} />
      <Route path="/signup" element={<SignUp handleSignUp={signup} />} />
      <Route path="/companies/:companyId" element={<CompanyDetails />} />
      <Route path="/profile" element={Profile} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/companies/:companyId/jobs" element={<Jobs />} />{" "}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
