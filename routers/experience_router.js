import { Router } from "express";
import { addExperience, getExperience, getSingleExperience,updateExperience, deleteExperience } from "../controllers/experience_controller.js";


const experienceRouter = Router();

experienceRouter.get("/experience", getExperience);
experienceRouter.get("/experience/:id", getSingleExperience);
experienceRouter.post("/experience", addExperience);
experienceRouter.patch("/experience/:id", updateExperience);
experienceRouter.delete("/experience/:id", deleteExperience);

export default experienceRouter;