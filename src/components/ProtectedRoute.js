import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ user, ...props }) {
  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}

export default ProtectedRoute;
