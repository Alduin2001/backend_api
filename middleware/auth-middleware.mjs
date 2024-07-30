import jwt from 'jsonwebtoken';
import getDataFromToken from '../config/get_from_token.mjs';
export default class AuthMiddleware{
    static verifyToken(req,res,next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = getDataFromToken(token);
            req.user = decoded;
        }catch(err){
            res.status(401).json({msg:'Вы неавторизованы'});
        }
    }
    static isAuth(req,res,next){
        try{
            req.user && next();
        }catch(err){
            res.status(403).json({msg:'Доступ запрещён'});
        }
    }
    static isAdmin(req,res,next){
        try {
            req.user && req.user.role == 'admin' && next();
        } catch (error) {
            res.status(403).json({msg:'Доступ запрещён'});
        }
    }
}