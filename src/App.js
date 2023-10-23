import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { UserProvider, useUser } from "./components/UserContext";
import NavBar from "./components/Navbar";
import JoblyApi from "./api/api";
import AppRoutes from "./components/Routes";
import useLocalStorage from "./components/useLocalStorage";

function App() {
  const { user, dispatch } = useUser();
  const [token, setToken] = useLocalStorage("user_token");

  useEffect(() => {
    // Set Axios headers with the token from local storage
    if (token) {
      JoblyApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await JoblyApi.getCurrentUser();
        dispatch({ type: "LOGIN_SUCCESS", payload: currentUser });
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }

    checkAuth();
  }, [dispatch]);

  const handleLogin = async (userData) => {
    try {
      const response = await JoblyApi.login(userData);
      if (response.success) {
        setToken(response.token); 
        dispatch({ type: "LOGIN_SUCCESS", payload: response.user });
        // Use navigate hook here if needed
      } else {
        console.error("Login failed:", response.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setToken(null);
      await JoblyApi.logout();
      dispatch({ type: "LOGOUT" });
      // Use navigate hook here if needed
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserProvider>
      <Router>
        <NavBar onLogout={handleLogout} />
        <AppRoutes login={handleLogin} />
      </Router>
    </UserProvider>
  );
}

export default App;
