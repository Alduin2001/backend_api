import { Router } from "express";
import userRouter from "./user_router.mjs";
import categoryRouter from "./category_routes.mjs";
const router = Router();
router.use('/users/',userRouter);
router.use('/categories/',categoryRouter);

export default router;