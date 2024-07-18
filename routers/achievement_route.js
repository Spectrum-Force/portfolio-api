import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievements, getOneAchievement, patchAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

const achievementRouter = Router();

// Define routes
achievementRouter.get('/users/achievements', checkUserSession, getAchievements);
achievementRouter.get('/users/achievements/:id', checkUserSession, getOneAchievement);
achievementRouter.post('/users/achievements', remoteUpload.single("image"), checkUserSession, addAchievement);
achievementRouter.patch('/users/achievements/:id', remoteUpload.single("image"), checkUserSession, patchAchievement);
achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteAchievement);

export default achievementRouter