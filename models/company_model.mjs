import mongoose, { Schema } from "mongoose";
import crypto from 'crypto';
import Product from "./products.mjs";
const companySchema = new mongoose.Schema({
    INN:{
        type:String,
        required:true
    },
    OGRN:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    seed:{
        type:String
    },
    verificationToken:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    dateRegister:{
        type:Date,
        required:true
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});
companySchema.pre('save',function(next){
    const company = this;
    if(!company.isModified()){
        next();
    }
    const cryptoToken = crypto.randomBytes(20).toString('hex');
    company.verificationToken = cryptoToken;
    next();
});

companySchema.pre('remove',async function(next){
    const company = this;
    await Product.deleteMany({company:company._id});
    next();
});
const Company = mongoose.model('Company',companySchema);
export default Company;