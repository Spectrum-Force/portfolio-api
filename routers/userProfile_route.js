import { Router } from "express";
import { addUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";


const userProfileRouter = Router();

userProfileRouter.get( "/users/userProfile", checkUserSession, getUserProfile);

userProfileRouter.post(
  "/users/userProfile",
  remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  checkUserSession,
  addUserProfile
);


userProfileRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    updateUserProfile
  );

// userProfileRouter.delete("/users/profile/:id", checkUserSession, deleteUserProfile);

export default userProfileRouter;