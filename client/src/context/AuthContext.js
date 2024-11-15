import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false); // Manage sign-up status

  // Function to log the user in
  const login = () => {
    setIsLoggedIn(true);
  };

  // Function to log the user out
  const logout = () => {
    setIsLoggedIn(false);
    setIsSignedUp(false); // Reset the sign-up status when logging out
  };

  // Function to set the user as signed up
  const signUp = () => {
    setIsSignedUp(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isSignedUp, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
