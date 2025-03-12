import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Form from "./Form";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const App = () => {
  const [user, setUser] = useState(null);

  // Function to check authentication state
  const checkAuth = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Ensure user data is correctly set
    } else {
      setUser();
    }
  };

  // Check authentication state on load & listen for storage changes
  useEffect(() => {
    checkAuth(); // Initial check

    // Listen for localStorage changes (for login/logout updates)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth); // Cleanup
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect to /app if authenticated, otherwise show Form */}
        <Route path="/" element={user ? <Navigate to="/app" /> : <Form />} />
        
        {/* Pass setUser to Login & Signup */}
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Private Route: Only accessible when logged in */}
        <Route
          path="/app"
          element={user ? <Form /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
