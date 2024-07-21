import CategoryController from "../controllers/category_controller.mjs";
import { Router } from "express";

const categoryRouter = Router();

categoryRouter.post('/create/',CategoryController.create);
categoryRouter.get('/read',CategoryController.read);
categoryRouter.get('/read/:id',CategoryController.readOne);
categoryRouter.put('/update/:id',CategoryController.update);
categoryRouter.delete('/delete/:id',CategoryController.delete);

export default categoryRouter;