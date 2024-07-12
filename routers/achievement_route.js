import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievements, getOneAchievement, patchAchievement } from "../controllers/achievement_controller.js";

const achievementRouter = Router();

// Define routes
achievementRouter.get('/achievements', getAchievements);
achievementRouter.get('/achievements/:id', getOneAchievement);
achievementRouter.post('/achievements', addAchievement);
achievementRouter.patch('/achievements/:id', patchAchievement);
achievementRouter.delete('/achievements/:id', deleteAchievement);