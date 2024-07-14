import { projectModel } from "../models/project_model.js";
import { User } from "../models/user_model.js";
import { projectSchema } from "../schema/projects_schema.js";

// Endpoints to post projects
export const postProject = async (req, res) => {
    try {

        const { error, value } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        console.log('userId', req.session.user.id);

        const userSessionId = req.session.user.id;

        const user = await User.findById(userSessionId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const project = await projectModel.create({
            ...value,
            user: userSessionId
        });

        user.education.push(project._id);
        await user.save();

        res.status(201).json({ project });


    } catch (error) {
        return res.status(400).send(error);
    }
};

// Endpoint to get all projects
export const getProjects = async (req, res) => {
    try {

        const userSessionId = req.session.user.id
        const allProjects = await projectModel.find({ user: userSessionId });

        if (allProjects.length == 0) {
            return res.status(404).json({ message: "No projects found" });
        }
        res.staus(200).json({project: allProjects});

    } catch (error) {
        return res.status(400).send(error);
    }
};


// Endpoint to get an event with a unique id

export const getOneProject = async (req, res) => {
    try {
        const getSingleProject = await projectModel.findById(req.params.id)
        console.log(`Project with ID ${req.params.id} has been retrieved`)
        res.status(200).json(getSingleProject);

    } catch (error) {
        return res.status(400).send(error);
    }
}

// Endpoint to update the details of a project

export const updateProject = async (req, res) => {
    try {
        const { error } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updateProject = await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateProject);

    } catch (error) {
        return res.status(400).send(error);
    }
}


// Endpoint to delete an event with a unique id
export const deleteProject = async (req, res, next) => {
    try {
        const deleteProject = await projectModel.findByIdAndDelete(req.params.id);
        if (!deleteProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) {
        next(error)
    }
}