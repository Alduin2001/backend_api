import Category from "../models/category_model.mjs";

export default class CategoryController {
  static async create(req, res) {
    try {
      const { name, description } = req.body;
      const category = new Category({
        name,
        description,
      });
      await category.save();
      res.status(201).json({ msg: "Категория добавлена" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async read(req, res) {
    try {
      let categories;
      const { name } = req.body;

      if (name !== undefined && name !== "") {
        categories = await Category.find({ name });
      } else {
        categories = await Category.find({});
      }

      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async readOne(req, res) {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        res.status(201).json({category});
    } catch (error) {
        res.status(500).json({msg:error});
    }
  }
  static async update(req,res){
    try {
        const id = req.params.id;
        const updated = await Category.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json({msg:'Данные обновлены'});
    } catch (error) {
        res.status(500).json({msg:error});
    }
  }
  static async delete(req,res){
    try{
        const id = req.params.id;
        const user = await Category.findByIdAndDelete(id);
        res.json({msg:'Категория удалёна'});
    }catch(error){
        res.status(500).json({msg:error});
    }
  }
}
