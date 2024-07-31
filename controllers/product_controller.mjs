import Product from "../models/products.mjs";
import getDataFromToken from "../config/get_from_token.mjs";
export default class ProductController {
  static async create(req, res) {
    try {
      const { name, description, price, company } = req.body;
      const product = new Product({
        name: name,
        description: description,
        price: price,
        company: company,
      });
      await product.save();
      res.status(201).json({ msg: "Продукт добавлен" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async read(req, res) {
    try {
      const { page } = parseInt(req.query.page);
      const limit = 10;
      const totalDocuments = await Product.countDocuments();
      const skip = (page - 1) * limit;
      const products = await Product.aggregate([
        {
          $lookup: {
            from: "category",
            localField: "category",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            price: 1,
            pictureName: 1,
            "category.name": 1,
          },
        },
      ]);
      res.status(200).json({
        products: products,
        page: page,
        pages: Math.ceil(totalDocuments / limit),
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async readOne(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id).lean();
    } catch (error) {}
  }
  static async update(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ msg: "Товар успешно обновлён" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async addFavourite(req, res) {
    try {
      const { token } = req.body;
      const id = req.params.id;
      const decoded = getDataFromToken(token);
      const favourite = await Product.findByIdAndUpdate(id, {
        $push: { isFavourite: decoded._id },
      });
      res.status(200).json({ msg: "Вы успешно добавили в избранное" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async deleteFavourite(req, res) {
    try {
      const id = req.params.id;
      const { token } = req.body;
      const decoded = getDataFromToken(token);
      const favourite = await Product.findByIdAndUpdate(id, {
        $pull: { isFavourite: decoded._id },
      });
      res.status(200).json({ msg: "Вы убрали из избранного" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByIdAndDelete(id);
      res.json({ msg: "Товар удалён" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
