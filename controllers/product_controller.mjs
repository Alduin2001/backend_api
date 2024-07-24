import Product from "../models/products.mjs";

export default class ProductController{
    static async create(req,res){
        try {
            const {name,description,price} = req.body;
            const product = new Product({
                name:name,
                description:description,
                price:price
            });
            await product.save();
            res.status(201).json({msg:'Продукт добавлен'});
        } catch (error) {
            res.status(500).json({error})
        }
    }
    static async read(req,res){
        try {
            const products = await Product.find({});
            res.status(200).json({products});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    static async readOne(req,res){
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
        } catch (error) {
            
        }
    }
    static async update(req,res){

    }
    static async delete(req,res){

    }
}