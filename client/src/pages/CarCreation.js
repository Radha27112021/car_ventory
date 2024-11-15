import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddCar from "../components/operations/AddCar";
import CarsList from "../components/operations/CarList";

function CarCreation() {
  const [cars, setCars] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Fetch cars from the database
  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/create-product");
      const data = await response.json();
      setCars(data); // Update the state with the fetched cars
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // UseEffect hook to fetch cars on page load
  useEffect(() => {
    fetchCars();
  }, []);

  // Handle success when a car is added
  const handleAddSuccess = () => {
    setShowAddDialog(false); // Close the add car dialog
    fetchCars(); // Re-fetch the cars list after adding a new car
  };

  // Handle delete car action
  const handleDeleteCar = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/create-product/${carId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the car from the list after deletion
        setCars(cars.filter((car) => car._id !== carId));
      } else {
        console.error("Failed to delete the car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="relative p-8 bg-cover bg-center min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1473042904451-00171c69419d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFja2dyb3VuZCUyMGZvciUyMGNhciUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide pt-8">
            Car Management
          </h2>

          {/* Add Car button */}
          <div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Car
            </button>
          </div>

          {/* Add Car Dialog */}
          {showAddDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  ×
                </button>
                <AddCar onSuccess={handleAddSuccess} />
              </div>
            </div>
          )}

          {/* Cars List Component */}
          <CarsList cars={cars} onDeleteCar={handleDeleteCar} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CarCreation;
