import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

function CarCollection() {
  const [cars, setCars] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredCars, setFilteredCars] = useState([]); // State for filtered cars
  const [expandedCarId, setExpandedCarId] = useState(null); // Track which car's details are expanded
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message (No cars found)

  useEffect(() => {
    // Fetch the data from the backend API
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars");
        if (!response.ok) throw new Error("Failed to fetch cars");
        const data = await response.json();

        // Ensure the response is an array before setting the state
        if (Array.isArray(data)) {
          setCars(data);
        } else {
          console.error("API did not return an array:", data);
          setCars([]); // If not an array, set an empty array
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars data:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle the key press for searching
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch(searchTerm);
    }
  };

  // Perform search and filter the cars
  const performSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const results = cars.filter((car) => {
      return (
        (car.title && car.title.toLowerCase().includes(lowerCaseTerm)) ||
        (car.tags &&
          car.tags.some((tag) => tag.toLowerCase().includes(lowerCaseTerm))) ||
        (car.description &&
          car.description.toLowerCase().includes(lowerCaseTerm)) ||
        (car.specifications &&
          Object.values(car.specifications).some((spec) =>
            String(spec).toLowerCase().includes(lowerCaseTerm)
          ))
      );
    });

    if (results.length === 0) {
      setErrorMessage(`No cars found for "${term}"`);
    } else {
      setErrorMessage("");
    }

    setFilteredCars(results);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCars(cars); // Reset to all cars when search term is empty
      setErrorMessage("");
    }
  }, [searchTerm, cars]);

  // Toggle the car details view
  const handleToggleDetails = (carId) => {
    setExpandedCarId((prevId) => (prevId === carId ? null : carId));
  };

  if (loading) {
    return <p>Loading cars...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-10">
        <div className="max-w-2xl mx-auto mt-6 mb-2 px-6">
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress} // Trigger search on Enter key press
            className="w-full p-3 border-2 rounded-lg mb-4 bg-blue-200 text-black"
          />
        </div>
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Our Car Collection
        </h1>

        {/* Display an error message if no cars match the search term */}
        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}

        {/* Display filtered cars */}
        {filteredCars.length === 0 && !errorMessage ? (
          <p className="text-center text-gray-500">No cars available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.carId} // Use carId as the key for better handling
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105"
              >
                <img
                  src={car.images}
                  alt={car.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{car.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {car.description
                    ? car.description.slice(0, 100)
                    : "No description available"}
                  {car.description && car.description.length > 100 ? "..." : ""}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  <span className="font-semibold">Tags:</span>{" "}
                  {car.tags ? car.tags.join(", ") : "No tags"}
                </p>
                <p className="font-semibold text-xl text-blue-500">
                  Price: {car.price}
                </p>

                {/* Show less or more details based on the expandedCarId */}
                {expandedCarId === car.carId ? (
                  <div className="mt-4 space-y-2">
                    <p className="font-semibold text-xl text-gray-500">
                      Manufacturing Year : {car.manufacturingYear}
                    </p>
                    <h3 className="font-semibold text-lg">Specifications</h3>
                    <ul className="text-sm text-gray-700">
                      {car.specifications && (
                        <>
                          <li>
                            <strong>Engine:</strong> {car.specifications.engine}
                          </li>
                          <li>
                            <strong>Horsepower:</strong>{" "}
                            {car.specifications.horsepower}
                          </li>
                          <li>
                            <strong>Torque:</strong> {car.specifications.torque}
                          </li>
                          <li>
                            <strong>Transmission:</strong>{" "}
                            {car.specifications.transmission}
                          </li>
                          <li>
                            <strong>Fuel Efficiency:</strong>{" "}
                            {car.specifications.fuelEfficiency}
                          </li>
                        </>
                      )}
                    </ul>

                    <h3 className="font-semibold text-lg mt-4">Dimensions</h3>
                    <ul className="text-sm text-gray-700">
                      {car.dimensions && (
                        <>
                          <li>
                            <strong>Length:</strong> {car.dimensions.length}
                          </li>
                          <li>
                            <strong>Width:</strong> {car.dimensions.width}
                          </li>
                          <li>
                            <strong>Height:</strong> {car.dimensions.height}
                          </li>
                          <li>
                            <strong>Wheelbase:</strong>{" "}
                            {car.dimensions.wheelbase}
                          </li>
                        </>
                      )}
                    </ul>

                    <button
                      onClick={() => handleToggleDetails(car.carId)}
                      className="mt-4 p-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Show Less
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleToggleDetails(car.carId)}
                    className="mt-4 p-2 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    View More Details
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CarCollection;
