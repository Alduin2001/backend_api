import mongoose, { Schema } from "mongoose";
import User from "./user_models.mjs";
import Company from "./company_model.mjs";
import Category from "./category_model.mjs";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [
    {
      type:Schema.Types.ObjectId,
      ref:'Category',
      index:true
    }
  ],
  company:{
    type:Schema.Types.ObjectId,
    ref:'Company'
  },
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
