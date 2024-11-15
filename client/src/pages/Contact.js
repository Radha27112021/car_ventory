import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (formData.name.trim().length < 3)
      errors.name = "Name must be at least 3 characters long.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email address.";
    if (!/^\d{10}$/.test(formData.phone))
      errors.phone = "Phone number must be 10 digits.";
    if (formData.address.trim().length < 5)
      errors.address = "Address must be at least 5 characters.";
    if (formData.message.trim().length < 10)
      errors.message = "Message must be at least 10 characters.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post(
          "http://localhost:5000/api/contact",
          formData
        );
        setResponseMessage(response.data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        setShowModal(true);
      } catch (error) {
        setResponseMessage("Failed to send message, please try again.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto my-10 p-5 border rounded shadow">
        <h2 className="text-2xl font-bold mb-5">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "address", "message"].map((field) => (
            <div key={field}>
              <label className="block text-lg font-medium capitalize">
                {field}
              </label>
              <input
                type={
                  field === "message" || field === "address"
                    ? "textarea"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                rows={field === "message" ? "5" : "3"}
              />
              {errors[field] && <p className="text-red-500">{errors[field]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4">Thank you!</h3>
              <p>{responseMessage}</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
