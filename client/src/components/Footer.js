import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold">Carventory</h2>
            <p className="text-gray-400 mt-2">
              Your Ultimate Car Management System
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <p className="text-gray-400 hover:text-green-500 transition-colors">
              Contact Us On- +91-9336XXXXXX
            </p>
            <Link
              to="/privacy" // Use Link to navigate internally to Privacy Policy
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Carventory. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
