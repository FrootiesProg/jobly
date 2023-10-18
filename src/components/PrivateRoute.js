import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../components/UserContext"; // Import your UserContext

/**
 * Higher-Order Component for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, it redirects to the login form.
 */
function PrivateRoute({ path, children }) {
  const { state } = useContext(UserContext); // Use the UserContext to get user state

  // Check if the user is authenticated, and if not, redirect to the login page
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, allow access to the protected route
  return <Route path={path}>{children}</Route>;
}

export default PrivateRoute;
