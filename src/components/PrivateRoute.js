import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
