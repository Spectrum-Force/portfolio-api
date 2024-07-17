import { Router } from "express";
import { postProject, getProjects, getOneProject, deleteProject, updateProject } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const projectRouter = Router();

projectRouter.post("/users/projects", checkUserSession, postProject);

projectRouter.get("/users/projects", checkUserSession, getProjects);

projectRouter.get("/users/projects/:id", getOneProject);

projectRouter.delete("/users/projects/:id", deleteProject);

projectRouter.patch("/users/projects/:id", checkUserSession, updateProject);

export default projectRouter;