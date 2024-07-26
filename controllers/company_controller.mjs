import Company from "../models/company_model.mjs";
import generatePhrase from "../config/seed_phrase.mjs";
export default class CompanyController{

    static async create(req,res){
        try {
            const {INN,OGRN,email,phone} = req.body;
            const seed = generatePhrase(5);
            const company = new Company({
                INN:INN,
                OGRN:OGRN,
                email:email,
                phone:phone,
                seed:seed
            });
            await company.save();
            res.status(201).json({seed});
        } catch (error) {
            console.log(error);
            res.status(500).json({error});
        }
    }
    static async read(req,res){
        try {
            const companies = await Company.find({});
            res.status(200).json({companies});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    static async readOne(req,res){
        try {
            const id = req.params.id;
            const company = await Company.findById(id);
            company ? res.status(200).json({company}) : res.status(200).json({msg:'Не найдено'});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    static async update(req,res){
        try {
            const id = req.params.id;
            const company = await Company.findByIdAndUpdate(id,req.body,{new:true});
            res.status(200).json({msg:'Успешно обновлён'});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    static async delete(req,res){
        try {
            const id = req.params.id;
            const company = await Company.findByIdAndDelete(id);
            res.json({msg:'Успешно удалён'});
        } catch (error) {
            res.status(500).json({error});
        }
    }
}