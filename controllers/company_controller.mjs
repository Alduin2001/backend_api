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

    }
    static async update(req,res){

    }
    static async delete(req,res){

    }
}