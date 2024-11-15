import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false); // Track sign-up state

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basic validation
  const validate = () => {
    let errors = {};
    if (formData.name.length < 3)
      errors.name = "Name must be at least 3 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email address.";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show validation errors if any
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          "http://localhost:5000/api/signup",
          formData
        );
        setResponseMessage(response.data.message);
        alert(response.data.message); // Show pop-up with message
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        // Mark as signed up and redirect to login page
        setIsSignedUp(true); // Set sign-up state to true
        navigate("/login"); // Redirect to login page after successful signup
      } catch (error) {
        setResponseMessage("Failed to sign up, please try again.");
        alert("Error: " + error.response?.data?.message || "Server error");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow bg-blue-300 text-center">
      <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-green-600">{responseMessage}</p>
      )}
    </div>
  );
}

export default SignUp;
