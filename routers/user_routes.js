import { getUser, getUsers, login, signup, getUserProfile } from "../controllers/user_controller.js";
import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.post('/users/auth/signup', signup);
userRouter.post('/users/auth/login', login);
userRouter.get('/users/auth/:userName', getUser);
userRouter.get('/users/userProfile', getUserProfile);

userRouter.post(
    '/users/userProfile',
    remoteUpload.fields([
        {name: "profilePicture", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    checkUserSession,
    createUserProfile
);

userRouter.patch(
    '/users/userProfile/:id',
    remoteUpload.fields([
        {name: "profilePicture", maxCount: 1},
        {name: "resume", maxCount: 1},
    ]),
    checkUserSession, 
    updateUserProfile
);


