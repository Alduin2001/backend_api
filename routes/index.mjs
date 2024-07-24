import { Router } from "express";
import userRouter from "./user_router.mjs";
import categoryRouter from "./category_routes.mjs";
import companyRouter from "./company_router.mjs";
const router = Router();
router.use('/users/',userRouter);
router.use('/categories/',categoryRouter);
router.use('/company',companyRouter);

export default router;