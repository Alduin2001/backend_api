import { Router } from "express";
import UserController from "../controllers/user_controller.mjs";

const userRouter = Router();
userRouter.post('/create/',UserController.create);
userRouter.get('/read/',UserController.read);
userRouter.get('/read/:id',UserController.readOne);
userRouter.put('/update/:id',UserController.update);
userRouter.delete('/delete/:id',UserController.delete);

export default userRouter;