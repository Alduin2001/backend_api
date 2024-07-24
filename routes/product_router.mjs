import { Router } from "express";
import ProductController from "../controllers/product_controller.mjs";

const productRouter = Router();
productRouter.post('/create',ProductController.create);
productRouter.get('/read',ProductController.read);
productRouter.get('/read/:id',ProductController.readOne);
productRouter.put('/update/:id',ProductController.update);
productRouter.delete('/delete/:id',ProductController.delete);

export default productRouter;