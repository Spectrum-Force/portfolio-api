import { Router } from "express";
import { postEducation, getEducation, deleteEducation, updateEducation, getSingleEducation } from "../controllers/education_controller.js";
import { checkUserSession } from "../middlewares/auth.js";



const educationRouter = Router();

educationRouter.post("/users/education", checkUserSession, postEducation);

educationRouter.get("/users/education", checkUserSession, getEducation);

educationRouter.delete("/users/education/:id", deleteEducation);

educationRouter.patch("/users/education/:id", checkUserSession, updateEducation);

educationRouter.get("/users/education/:id", getSingleEducation);

export default educationRouter;