import { Router } from "express";
import userRouter from "./user_router.mjs";
const router = Router();
router.use('/users/',userRouter);

export default router;