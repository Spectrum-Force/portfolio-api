import { Router } from "express";
import { addSkill, deleteSkill, getOneSkill, getSkills, patchSkill } from "../controllers/skill_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

// Create a router
const skillRouter = Router();

// Define routes
skillRouter.get('/users/skills', checkUserSession, getSkills);
skillRouter.get('/users/skills/:id', checkUserSession, getOneSkill);
skillRouter.post('/users/skills', checkUserSession, addSkill);
skillRouter.patch('/users/skills/:id', checkUserSession, patchSkill);
skillRouter.delete('/users/skills/:id', deleteSkill);

export default skillRouter