import { Router } from "express";
import { postProject, getProjects, getOneProject, deleteProject, updateProject } from "../controllers/project_controller.js";

const projectRouter = Router();

projectRouter.post("/projects", postProject);
projectRouter.get("/projects", getProjects);
projectRouter.get("projects/:id", getOneProject);
projectRouter.delete("projects/:id", deleteProject);
projectRouter.patch("projects/:id", updateProject);

export default projectRouter;