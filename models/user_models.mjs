import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validators from "../config/validators.mjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(prop) {
                return validators[0].pattern.test(prop);
            },
            message: `Имя ${validators[0].message}`
        }
    },
    surname: {
        type: String,
        required: true,
        validate: {
            validator: function(prop) {
                return validators[0].pattern.test(prop);
            },
            message: `Фамилия ${validators[0].message}`
        }
    },
    patronymic: {
        type: String,
        required: true,
        validate: {
            validator: function(prop) {
                return validators[0].pattern.test(prop);
            },
            message: `Отчество ${validators[0].message}`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(prop) {
                return validators[1].pattern.test(prop);
            },
            message: validators[1].message
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    verificationToken: {
        type: String,
        index: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    dateRegister: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const cryptoToken = crypto.randomBytes(20).toString('hex');
    const salt = await bcrypt.genSalt(10);
    user.verificationToken = cryptoToken;
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
export default User;