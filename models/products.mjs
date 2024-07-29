import mongoose, { Schema } from "mongoose";
import User from "./user_models.mjs";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {},
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pictureName: {
    type: String,
  },
  isFavourite: [
    {
      type: Schema.ObjectId,
      ref: "User",
      index:true
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
