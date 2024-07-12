import { Router } from "express";
import { addSkill, deleteSkill, getSkill, getSkills, patchSkill } from "../controllers/skill_controller.js";

// Create a router
const skillRouter = Router();

// Define routes
skillRouter.get('/skills', getSkills)
skillRouter.get('/skills/:id', getSkill)
skillRouter.post('/skills', addSkill);
skillRouter.patch('/skills/:id', patchSkill);
skillRouter.delete('/skills/:id', deleteSkill)