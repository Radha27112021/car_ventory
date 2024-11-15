import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basic validation
  const validate = () => {
    let errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );

      if (response.status === 200) {
        setResponseMessage("Login successful!");
        setTimeout(() => {
          navigate("/"); // Redirect to the home page after login
        }, 1000);
      } else {
        setResponseMessage("Unexpected response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      setResponseMessage(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
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
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {responseMessage && (
        <p
          className={`mt-4 ${
            responseMessage.includes("successful")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
}

export default Login;
