import jwt from 'jsonwebtoken';
import { getDataFromToken } from '../config/token_methods.mjs';
export default class AuthMiddleware{
    static async verifyToken(req,res,next){
        try{
            const token = req.headers.authorization;
            const decoded = await getDataFromToken(token);
            req.user = decoded;
        }catch(err){
            res.status(401).json({msg:'Вы неавторизованы'});
        }
    }
    static isAuth(req,res,next){
        AuthMiddleware.verifyToken(req,res,function(next){
            try{
                if(req.user){
                    next();   
                }
            }catch(err){
                res.status(403).json({msg:'Доступ запрещён'});
            }
        });
    }
    static isAdmin(req,res,next){
        try {
            req.user && req.user.role == 'admin' && next();
        } catch (error) {
            res.status(403).json({msg:'Доступ запрещён'});
        }
    }
}