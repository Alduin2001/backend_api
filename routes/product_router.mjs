import { Router } from "express";
import ProductController from "../controllers/product_controller.mjs";

const productRouter = Router();
productRouter.post('/create',ProductController.create);
productRouter.get('/read',ProductController.read);
productRouter.get('/read/:id',ProductController.readOne);
productRouter.put('/update/:id',ProductController.update);
productRouter.delete('/delete/:id',ProductController.delete);
productRouter.put('add_favourite/:id',ProductController.addFavourite);
productRouter.delete('/delete_favourite/:id',ProductController.deleteFavourite);
export default productRouter;