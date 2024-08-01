import mongoose, { Schema } from "mongoose";
import Product from "./products.mjs";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});

categorySchema.pre('remove',async function(next){
    const category = this;
    await Product.updateMany({categories:category._id},
        {$pull:{categories:category._id}}
    )
    next();
});

const Category = mongoose.model('Category',categorySchema);
export default Category;