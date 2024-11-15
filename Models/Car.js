const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carId: {
      type: String, // You can choose other types like Number if needed
      required: true,
      unique: true, // Make sure carId is unique
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    specifications: {
      engine: { type: String, required: true },
      horsepower: { type: String, required: true },
      torque: { type: String, required: true },
      transmission: { type: String, required: true },
      fuelEfficiency: { type: String, required: true },
    },
    dimensions: {
      length: { type: String, required: true },
      width: { type: String, required: true },
      height: { type: String, required: true },
      wheelbase: { type: String, required: true },
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    colorOptions: {
      type: [String],
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    warranty: {
      battery: { type: String, required: true },
      vehicle: { type: String, required: true },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const Car =
  mongoose.models.Car || mongoose.model("Car", carSchema, "Cars_Details");

module.exports = Car;
