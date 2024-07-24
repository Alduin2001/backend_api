import { Router } from "express";
import CompanyController from "../controllers/company_controller.mjs";

const companyRouter = Router();
companyRouter.post('/create',CompanyController.create);

export default companyRouter;