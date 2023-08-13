const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, min: [0, "min price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "min discount"],
    max: [50, "max discount"],
  },
  rating: {
    type: Number,
    min: [0, "min rating"],
    max: [5, "max rating"],
    default: 0,
  },
  stock: Number,
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: String,
  images: [String],
});

exports.ProductModel = mongoose.model("Product", productSchema);
