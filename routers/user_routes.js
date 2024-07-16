import { getUser, getUsers, login, signup, token } from "../controllers/user_controller.js";
import { Router } from "express";
// import { checkUserSession } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.post('/users/auth/signup', signup);
userRouter.post('/users/auth/login', login);
userRouter.post('/users/auth/token', token);
userRouter.get('/users/auth/:userName', getUser);




