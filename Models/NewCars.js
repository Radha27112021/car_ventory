const mongoose = require("mongoose");

// Check if the model already exists before defining it again
const NewCarSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  price: Number,
  images: [String],
});

const New_Cars =
  mongoose.models.New_Cars || mongoose.model("New_Cars", NewCarSchema);

module.exports = New_Cars;
