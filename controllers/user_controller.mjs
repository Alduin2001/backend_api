import User from "../models/user_models.mjs";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class UserController{
    static async create(req,res){
        try {
            const {name,surname,login,password} = req.body;
            const user = new User({
                name,
                surname,
                login,
                password
            });
            await user.save();
            res.status(201).json({msg:'Пользователь успешно создан'});
        } catch (error) {
            res.status(500).json({msg:error});
        }
    }
    static async login(req,res){
        try {
            const {login,password} = req.body;
            const findUser = await User.find({login});
            if(!findUser || bcrypt.compareSync(password,findUser.password)){
                res.status(400).json({msg:'Неправильный логин или пароль'});
            }
            const tokenData = {
                _id:findUser._id,
                name:findUser.name,
                surname:findUser.surname,
                login:findUser.login
            };
            const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'10h'});
            res.status(200).json({token:token});
        } catch (error) {
            res.status(500).json({msg:error});
        }
    }
    static async read(req,res){
        try{
            const users = await User.find({});
            res.status(201).json({users:users});

        }catch(err){
            res.status(500).json({msg:err});
        }
    }
    static async readOne(req,res){
        try{
            const id = req.params.id;
            const user = await User.findById(id);
            res.status(201).json({user:user});
        }catch(err){
            res.status(500).json({msg:err});
        }
    }
    static async update(req,res){
        try {
            const id = req.params.id;
            const user = await User.findByIdAndUpdate(id,req.body,{new:true});
            res.status(201).json({msg:'Данные обновлены'});
        } catch (error) {
            res.status(500).json({msg:error});
        }
    }
    static async delete(req,res){
        try{
            const id = req.params.id;
            const user = await User.findByIdAndDelete(id);
            res.json({msg:'Пользователь удалён'});
        }catch(error){
            res.status(500).json({msg:error});
        }
    }
}