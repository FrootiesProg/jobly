import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";


const UserContext = createContext();

// Custom hook to use the UserContext and return the current state and dispatch function
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGIN_FAIL":
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(user) });
    }
  }, []);

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post("/api/login", credentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
      // Handle errors, maybe set some error state or use an alert context
    }
  };

  const logoutUser = () => {
    // Perform any logout operations, e.g., axios.post('/api/logout');
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider value={{ ...state, dispatch, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
