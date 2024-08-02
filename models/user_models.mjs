import mongoose from "mongoose";
import bcrypt from 'bcrypt';
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

userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    const cryptoToken = crypto.randomBytes(20).toString('hex');
    const salt = await bcrypt.genSalt(10);
    user.verificationToken = cryptoToken;
    user.password = await bcrypt.hash(user.password,salt);
    next();
});
const User = mongoose.model('User',userSchema);
export default User;