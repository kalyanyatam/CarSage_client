import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Check Authentication Function
  const checkAuth = () => {
    const auth = localStorage.getItem("user");
    if (auth) {
      setUser(JSON.parse(auth));
    }
  };

  // Check authentication state on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">CarSage</Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300"><FaHome /> Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
        </div>

        {/* User Account */}
        {user ? (
          <div className="relative">
            {/* Profile Picture Clickable Button */}
            <button
              className="flex items-center text-white space-x-2"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <FaUserCircle size={32} />
              <span className="hidden md:inline font-semibold">{user.username}</span>
            </button>

            {/* Sidebar */}
            {showSidebar && (
              <div className="fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transition-transform">
                {/* Sidebar Header */}
                <div className="p-5 text-lg font-semibold border-b border-gray-700 flex items-center space-x-2">
                  <FaUserCircle size={32} />
                  <span>{user.username}</span>
                </div>

                {/* Sidebar Menu */}
                <ul className="p-5 space-y-4">
                  <li>
                    <Link to="/profile" className="flex items-center space-x-3 hover:text-gray-400">
                      <FaUser />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="flex items-center space-x-3 hover:text-gray-400">
                      <FaCog />
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 hover:text-red-500 w-full"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-white font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
