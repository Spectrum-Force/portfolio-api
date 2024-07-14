import { Router } from "express";
import { addExperience, getExperience, getSingleExperience,updateExperience, deleteExperience } from "../controllers/experience_controller.js";


const experienceRouter = Router();

experienceRouter.get("/user/experience", getExperience);
experienceRouter.get("/user/experience/:id", getSingleExperience);
experienceRouter.post("/user/experience", addExperience);
experienceRouter.patch("/user/experience/:id", updateExperience);
experienceRouter.delete("/user/experience/:id", deleteExperience);

export default experienceRouter;