// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Stores logged-in user role (admin/employee). Null = logged out.
  const [role, setRole] = useState(null);

  //storing logged in user's name
  const [name, setName] = useState(null);


  // Prevents ProtectedRoute + Navbar from rendering too early.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     // on page refresh: restore user role from localStorage.
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      // If Session exists → restore user login state.
      setRole(savedRole);
    }

     // Restoring name
      const savedName = localStorage.getItem("name");
      if (savedName) {
        setName(savedName);
      }
    // Initialization complete — components can render safely.
    setLoading(false); 
  }, []);

  // We use localStorage to persist authentication across page refreshes.
  // - "token" is used for backend API authentication.
  // - "role" is used for frontend routing (ProtectedRoute) + Navbar UI.
  // This keeps the user logged in even after closing/reloading the browser.
  const login = (userRole,userName) => {
    // Save role and name in state + in browser (persistent login)
    setRole(userRole);
    setName(userName);
    localStorage.setItem("role", userRole);
    localStorage.setItem("name", userName);

  };
  // Clear session from localStorage on logout
  const logout = () => {
    setRole(null);
    setName(null);
    localStorage.removeItem("role");
    localStorage.removeItem("name"); 
    localStorage.removeItem("token");
  };

  const value = {
    role,
    name,
    login,
    logout,
    loading
  };

  return (
    // Provide role, login, logout, loading to entire app.
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};