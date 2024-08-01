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
        categories = await Category.aggregate([
          {
            $match: { name: { $regex: name } },
          },
          {
            $project: {
              _id: 1,
              name: 1
            },
          },
        ]);
      } else {
        categories = await Category.aggregate([
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
            },
          },
        ]);
      }
      if (categories.length === 0) {
        return res.status(404).json({ msg: "Категория не найдена" });
      } 
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async readOne(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.findById(id,'_id name description');
      res.status(201).json({ category });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const updated = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json({ msg: "Данные обновлены" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const user = await Category.findByIdAndDelete(id);
      res.json({ msg: "Категория удалёна" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}
