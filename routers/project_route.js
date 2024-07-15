import { Router } from "express";
import { postProject, getProjects, getOneProject, deleteProject, updateProject } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

const projectRouter = Router();

projectRouter.post("/user/projects", checkUserSession, postProject);

projectRouter.get("/user/projects", checkUserSession, getProjects);

projectRouter.get("/user/projects/:id", getOneProject);

projectRouter.delete("/user/projects/:id", deleteProject);

projectRouter.patch("/user/projects/:id", checkUserSession, updateProject);

export default projectRouter;