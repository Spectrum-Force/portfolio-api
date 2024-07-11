import { Router } from "express";
import { postProject, getProjects, getOneProject, deleteProject, updateProject } from "../controllers/project_controller.js";

const projectRouter = Router();

projectRouter.post("/user/projects", postProject);
projectRouter.get("/user/projects", getProjects);
projectRouter.get("/user/projects/:id", getOneProject);
projectRouter.delete("/user/projects/:id", deleteProject);
projectRouter.patch("/user/projects/:id", updateProject);

export default projectRouter;