import mongoose from "mongoose";
import bcrypt, { genSaltSync, hash } from 'bcrypt';
import crypto from 'crypto';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    patronymic:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    verificationToken:{
        type:String,
        index:true
    },
    verifyed:{
        type:Boolean,
        default:false
    },
    dateRegister:{
        type:Date,
        default:Date.now()
    }
});

userSchema.pre('save',function(next){
    const user = this;
    if(!user.password.isModified()){
        next();
    }
    const cryptoToken = crypto.randomBytes(20).toString('hex');
    const salt = genSaltSync(10);
    user.verificationToken = cryptoToken;
    user.password = hash(user.password,salt);
    next();
});
const User = mongoose.model('User',userSchema);
export default User;