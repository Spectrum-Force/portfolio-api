import { Router } from "express";
import { addExperience, getExperience, getSingleExperience,updateExperience, deleteExperience } from "../controllers/experience_controller.js";
import { checkUserSession } from "../middleware/auth.js";


const experienceRouter = Router();

experienceRouter.get("/users/experience", checkUserSession, getExperience);

experienceRouter.get("/users/experience/:id", getSingleExperience);

experienceRouter.post("/users/experience", checkUserSession, addExperience);

experienceRouter.patch("/users/experience/:id", checkUserSession, updateExperience);

experienceRouter.delete("/users/experience/:id", deleteExperience);

export default experienceRouter;