import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use the useAuth hook for global auth state

function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // Assume isLoggedIn is managed globally
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Perform logout
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-black p-4 flex justify-between items-center shadow-md">
      <img
        src="https://images.unsplash.com/photo-1619679505795-a4d0e6be5e02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENJJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D"
        className="h-20 w-20 rounded-full"
        alt="Logo"
      />
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-white text-lg hover:text-green-500">
          Home
        </Link>
        <Link to="/about" className="text-white text-lg hover:text-green-500">
          About Us
        </Link>
        <Link to="/contact" className="text-white text-lg hover:text-green-500">
          Contact
        </Link>
        {!isLoggedIn ? (
          <>
            <Link
              to="/signup"
              className="bg-green-500 text-white py-2 px-6 rounded-md"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-6 rounded-md"
            >
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
