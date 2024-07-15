import { Router } from "express";

import { addUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userProfile_controller.js";

import { checkUserSession } from "../middleware/auth.js";


const userProfileRouter = Router();

userProfileRouter.post("/users/profile", checkUserSession, addUserProfile);

userProfileRouter.get("/users/profile/:id", getUserProfile);

userProfileRouter.patch("/users/profile/:id", checkUserSession, updateUserProfile);

userProfileRouter.delete("/users/profile/:id", checkUserSession, deleteUserProfile);

export default userProfileRouter;