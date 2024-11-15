const mongoose = require("mongoose");

// Define the schema for car data with the correct fields
const carSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique identifier for the car (can be string or number)
  title: { type: String, required: true }, // Title of the car
  description: { type: String, required: true }, // Description of the car
  tag: { type: [String], required: true }, // Tag associated with the car (e.g., "SUV", "Sedan")
  image: { type: String, required: true }, // Image URL of the car
  price: { type: String, required: true },
});

// Create a model for the "new_cars" collection
module.exports = mongoose.model("New_Cars", carSchema, "new_cars");
