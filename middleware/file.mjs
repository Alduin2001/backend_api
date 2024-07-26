import multer, { diskStorage } from "multer";
const allowedTypes = ['image/png','image/jpeg'];
import path from 'path';
import fs from 'fs';

const storage = diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(import.meta.url,'../uploads'));
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now}-${file.originalname}`);
    }
})

const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        if(allowedTypes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Не поддерживаемый тип файла'),false);
        }
    },
    limits:{
        fileSize:1024*1024*10
    }
});

const deleteFileMiddleware = (file)=>{
    try{
        fs.unlink(path.join(__dirname,'../uploads',file));
    }catch(err){
        console.log(err);
    }
}

export {upload,deleteFileMiddleware};