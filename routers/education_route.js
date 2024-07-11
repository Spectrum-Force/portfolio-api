import { Router } from "express";
import { postEducation, getEducation, deleteEducation, updateEducation, getSingleEducation } from "../controllers/education_controller.js";


const educationRouter = Router();

educationRouter.post("/education", postEducation);
educationRouter.get("/education", getEducation);
educationRouter.delete("/education/:id", deleteEducation);
educationRouter.patch("/education/:id", updateEducation);
educationRouter.get("/education/:id", getSingleEducation);

export default educationRouter;