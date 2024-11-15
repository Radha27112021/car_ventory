import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCar({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState(""); // New state for price
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setError("You can only upload up to 10 images.");
    } else {
      setError("");
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    const parsedPrice = parseFloat(price);
    if (
      !title ||
      !description ||
      !tags ||
      isNaN(parsedPrice) ||
      images.length === 0
    ) {
      setError("All fields are required, and price must be a valid number.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag); // filtering empty tags

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("price", parsedPrice); // Add parsed price to the form data

    try {
      const response = await fetch("http://localhost:5000/api/newcars/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Clear the form after successful submission
        setTitle("");
        setDescription("");
        setTags("");
        setPrice(""); // Clear the price field
        setImages([]);
        setError("");
        setSuccess(true); // Set success state to true
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Failed to add car.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccess(false);
    onSuccess(); // Call the parent callback to close the modal
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4 text-black">
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Add a New Car
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="text"
            placeholder="Car Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            rows="4"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <p className="text-gray-500 text-sm mt-2">
            You can upload up to 10 images.
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            Add Car
          </button>
        </form>
      )}

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Car Added Successfully!
            </h2>
            <button
              onClick={handleCloseSuccessDialog}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCar;
