import { signup } from "../controllers/user_controller.js";
import { Router } from "express";

export const userRouter = Router()

userRouter.post('/users/signup', signup)