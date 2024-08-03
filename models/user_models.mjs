import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(prop) {
                return /^[А-Яа-я]+$/.test(prop);
            },
            message: 'Имя должно быть кириллицей'
        }
    },
    surname: {
        type: String,
        required: true,
        validate: {
            validator: function(prop) {
                return /^[А-Яа-я]+$/.test(prop);
            },
            message: 'Фамилия должна быть кириллицей'
        }
    },
    patronymic: {
        type: String,
        required: true,
        validate: {
            validator: function(prop) {
                return /^[А-Яа-я]+$/.test(prop);
            },
            message: 'Отчество должно быть кириллицей'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(prop) {
                return /^\S+@\S+\.\S+$/.test(prop);
            },
            message: 'Поле не является почтой'
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