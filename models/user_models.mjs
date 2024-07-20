import mongoose from "mongoose";
import bcrypt, { genSaltSync, hash } from 'bcrypt';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    login:{
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
    dateRegister:{
        type:Date,
        default:Date.now()
    }
});

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified()){
        next();
    }
    const salt = genSaltSync(10);
    user.password = hash(user.password,salt);
    next();
});
const User = mongoose.model('User',userSchema);
export default User;