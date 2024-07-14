import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievements, getOneAchievement, patchAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const achievementRouter = Router();

// Define routes
achievementRouter.get('users/achievements', checkUserSession, getAchievements);
achievementRouter.get('users/achievements/:id', checkUserSession, getOneAchievement);
achievementRouter.post('users/achievements', checkUserSession, addAchievement);
achievementRouter.patch('users/achievements/:id', checkUserSession, patchAchievement);
achievementRouter.delete('users/achievements/:id', deleteAchievement);

export default achievementRouter