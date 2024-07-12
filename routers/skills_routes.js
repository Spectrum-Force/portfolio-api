import { Router } from "express";
import { addSkill, deleteSkill, getOneSkill, getSkills, patchSkill } from "../controllers/skill_controller.js";

// Create a router
const skillRouter = Router();

// Define routes
skillRouter.get('/skills', getSkills);
skillRouter.get('/skills/:id', getOneSkill);
skillRouter.post('/skills', addSkill);
skillRouter.patch('/skills/:id', patchSkill);
skillRouter.delete('/skills/:id', deleteSkill);