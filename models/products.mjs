import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{

    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    pictureName:{
        type:String
    }
});

const Product = mongoose.model('Product',productSchema);
export default Product;