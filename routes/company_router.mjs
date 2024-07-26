import { Router } from "express";
import CompanyController from "../controllers/company_controller.mjs";

const companyRouter = Router();
companyRouter.post('/create',CompanyController.create);
companyRouter.get('/read/',CompanyController.read);
companyRouter.get('/read/:id',CompanyController.readOne);
companyRouter.put('/update/:id',CompanyController.update);
companyRouter.delete('/delete/:id',CompanyController.delete);
export default companyRouter;