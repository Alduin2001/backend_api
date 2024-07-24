import mongoose from "mongoose";
import crypto from 'crypto';
const companySchema = new mongoose.Schema({
    INN:{
        type:String,
        required:true
    },
    OGRN:{
        type:String
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
    }
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

const Company = mongoose.model('Company',companySchema);
export default Company;