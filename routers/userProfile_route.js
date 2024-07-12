import { Router } from "express";

import { addUserProfile, getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/userProfile_controller.js";


const userProfileRouter = Router();

userProfileRouter.post("/user/profile", addUserProfile);
userProfileRouter.get("/user/profile/:id", getUserProfile);
userProfileRouter.put("/user/profile/:id", updateUserProfile);
userProfileRouter.delete("/user/profile/:id", deleteUserProfile);

export default userProfileRouter;