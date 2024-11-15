import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch car data from backend API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars?limit=3"); // Limit to 3 cars
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched car data:", data); // Debugging: log fetched data
        setCars(data.slice(0, 3)); // Limit to 3 cars if backend does not support limit
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Failed to load car data.");
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-100 text-center">
      <h3 className="text-4xl font-bold mb-12 text-gray-800">
        Our Featured Cars
      </h3>

      {loading ? (
        <p className="text-gray-600">Loading cars...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cars.map((car) => (
            <div
              key={car._id} // Updated to use _id as MongoDB likely uses _id
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={car.images}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                  {car.title}
                </h3>
                <p className="text-gray-600 mb-4">{car.description}</p>
                <p className="font-bold text-lg text-blue-500 mb-4">
                  Price: {car.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Explore Button */}
      <Link
        to="/cars"
        className="mt-12 inline-block bg-green-400 text-white py-3 px-10 rounded-full text-xl font-semibold hover:bg-green-600 transition-colors shadow-lg"
      >
        Explore Car Collection
      </Link>
    </section>
  );
}

export default FeaturedCars;
