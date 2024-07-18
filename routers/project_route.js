import { Router } from "express";
import { postProject, getProjects, getOneProject, deleteProject, updateProject } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

const projectRouter = Router();

projectRouter.post("/users/projects", remoteUpload.single("image"), checkUserSession, postProject);

projectRouter.get("/users/projects", checkUserSession, getProjects);

projectRouter.get("/users/projects/:id", getOneProject);

projectRouter.delete("/users/projects/:id", checkUserSession, deleteProject);

projectRouter.patch("/users/projects/:id",  remoteUpload.single("image"), checkUserSession, updateProject);

export default projectRouter;