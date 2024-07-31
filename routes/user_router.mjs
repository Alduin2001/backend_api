import { Router } from "express";
import UserController from "../controllers/user_controller.mjs";
import AuthMiddleware from "../middleware/auth-middleware.mjs";

const userRouter = Router();
userRouter.post('/create/',UserController.create);
userRouter.post('/login',UserController.login);
userRouter.get('/read/',UserController.read);
userRouter.get('/read/:id',UserController.readOne);
userRouter.delete('/delete/:id',UserController.delete);

export default userRouter;