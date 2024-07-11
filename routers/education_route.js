import { Router } from "express";
import { postEducation, getEducation, deleteEducation, updateEducation, getSingleEducation } from "../controllers/education_controller.js";


const educationRouter = Router();

educationRouter.post("/users/education", postEducation);
educationRouter.get("/users/education", getEducation);
educationRouter.delete("/users/education/:id", deleteEducation);
educationRouter.patch("/users/education/:id", updateEducation);
educationRouter.get("/users/education/:id", getSingleEducation);

export default educationRouter;