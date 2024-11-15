import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/newcars");
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    const intervalId = setInterval(fetchCars, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/newcars/delete/${carId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      } else {
        console.error("Failed to delete car");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  if (loading) return <p className="text-center text-white">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-12 p-6 w-full max-w-3xl mx-auto bg-gray-900 bg-opacity-90 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-white text-center mb-6">
        Cars Available
      </h3>
      {cars.length === 0 ? (
        <p className="text-center text-gray-300 mt-4">No cars available.</p>
      ) : (
        <ul className="space-y-4">
          {cars.map((car) => (
            <li
              key={car._id}
              className="p-4 bg-gray-700 bg-opacity-90 rounded-md shadow hover:bg-gray-600 transition-all duration-200"
            >
              <p>
                <strong>Title:</strong> {car.title}
              </p>
              <p>
                <strong>Description:</strong> {car.description}
              </p>
              <p>
                <strong>Tags:</strong> {car.tags.join(", ")}
              </p>
              <p>
                <strong>Image:</strong> Image added successfully
              </p>
              <p>
                <strong>Price:</strong> Rs.{car.price}
              </p>
              <div className="flex text-center items-center justify-center gap-10">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-red-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CarList;
