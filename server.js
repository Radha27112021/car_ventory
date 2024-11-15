const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const connectDB = require("./db"); // Import DB connection logic
const User = require("./User"); // Import User model
const Car = require("./Models/Car"); // Import Car model
const Contact = require("./Models/ContactModel"); // Import Contact model
const NewCars = require("./Models/NewCars"); // Corrected import of NewCars model

require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database (Do this only once)
connectDB();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// Route to register a new user
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Error signing up" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If login is successful, respond with user details
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Route to submit a contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  if (!name || !email || !phone || !address || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const contactMessage = new Contact({
      name,
      email,
      phone,
      address,
      message,
    });
    await contactMessage.save();
    res.status(201).json({ message: "Contact message submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
});

// Route to get all cars (Existing)
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// Route to get car details by carId (Existing)
app.get("/api/cars/:carId/details", async (req, res) => {
  const { carId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid carId format" });
  }

  try {
    const carDetails = await Car.findById(carId);

    if (carDetails) {
      res.json(carDetails);
    } else {
      res.status(404).json({ message: "Car details not found" });
    }
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ message: "Error fetching car details" });
  }
});

// Route to add a new car for selling
app.post("/api/newcars/add", upload.array("images", 10), async (req, res) => {
  const { title, description, tags, price } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : [];

  if (!title || !description || !tags || images.length === 0 || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  let parsedTags;
  try {
    parsedTags = JSON.parse(tags);
    if (!Array.isArray(parsedTags)) {
      return res
        .status(400)
        .json({ message: "Tags must be a valid JSON array." });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Tags must be a valid JSON array." });
  }

  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice)) {
    return res.status(400).json({ message: "Price must be a valid number." });
  }

  try {
    const newCar = new NewCars({
      title,
      description,
      tags: parsedTags,
      images,
      price: parsedPrice,
    });

    await newCar.save();

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Error adding car. Please try again." });
  }
});

// Route to update car details (Updating new cars)
app.put(
  "/api/newcars/update/:id",
  upload.array("images", 10),
  async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    const carId = req.params.id;

    if (!title || !description || !tags || images.length === 0) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
    } catch (error) {
      return res.status(400).json({ message: "Tags must be a JSON array." });
    }

    try {
      const car = await NewCars.findById(carId); // Correct model usage
      if (!car) {
        return res.status(404).json({ message: "Car not found." });
      }

      // Delete old images if any
      if (car.images.length > 0) {
        car.images.forEach((imagePath) => {
          fs.unlinkSync(imagePath); // Delete each image file
        });
      }

      // Update the car
      car.title = title;
      car.description = description;
      car.tags = parsedTags;
      car.images = images;
      car.price = price;
      // Save the updated car
      await car.save();

      res.status(200).json({ message: "Car updated successfully", car });
    } catch (error) {
      console.error("Error updating car:", error);
      res
        .status(500)
        .json({ message: "Error updating car. Please try again." });
    }
  }
);

// Route to delete a car (New car API)
app.delete("/api/newcars/delete/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await NewCars.findByIdAndDelete(carId); // Correct model usage
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Delete the images associated with the car
    car.images.forEach((imagePath) => {
      fs.unlinkSync(imagePath); // Delete each image file from the server
    });

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Error deleting car. Please try again." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
