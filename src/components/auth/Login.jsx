import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials!");
      }

      if (data.token) {
        alert("✅ Login successful!");
        console.log("Response Data:", data);

        // Store authentication data in localStorage
        const userData = { username: data.username, token: data.token };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // Update authentication state

        console.log("Saved to localStorage.");
        console.log("Navigating to /app...");
        navigate("/app");
      } else {
        throw new Error("Authentication failed! Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-lg p-6 w-96 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            className="bg-purple-600 text-white font-bold p-3 w-full rounded hover:bg-purple-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Login
          </motion.button>
        </form>
        <p className="mt-4 text-white">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-300 font-bold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
