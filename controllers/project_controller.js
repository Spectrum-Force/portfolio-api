import { projectModel } from "../models/project_model.js";
import { userProfileModel } from "../models/userProfile_model.js";
import { userModel } from "../models/user_model.js";
import { projectSchema } from "../schema/projects_schema.js";

// Endpoints to post projects
export const postProject = async (req, res) => {
    try {

        const { error, value } = projectSchema.validate({
            ...req.body,
            image: req.file.filename
        });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const project = await projectModel.create({
            ...value,
            user: userSessionId
        });

        user.projects.push(project._id);
        await user.save();

        res.status(201).json ({
            message: 'A project has been added successfully',
            project: project
        })



    } catch (error) {
        return res.status(400).send(error);
    }
};

// Endpoint to get all projects
export const getProjects = async (req, res) => {
    try {

        const userSessionId = req.session.user.id
        const allProjects = await projectModel.find({ user: userSessionId });

        // if (allProjects.length == 0) {
        //     return res.status(200).json({Projects: allProjects});
        // }
        res.status(200).json({Projects: allProjects});

    } catch (error) {
        return res.status(400).json(error.message);
    }
};


// Endpoint to get an event with a unique id

export const getOneProject = async (req, res) => {
    try {
        const getSingleProject = await projectModel.findById(req.params.id)
        console.log(`Project with ID ${req.params.id} has been retrieved`)
        res.status(200).json(getSingleProject);

    } catch (error) {
        return res.status(400).send(error.message);
    }
}

// Endpoint to update the details of a project

export const updateProject = async (req, res) => {
    try {
        const { error, value } = projectSchema.validate({
            ...req.body,
            image: req.file.filename
        });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user.id;
        const user = await userModel.findById(userSessionId);

        if (!user) {
            return res.status(404).send("User not found")
        }

        const updateProject = await projectModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updateProject) {
            return res.status(404).send({project: updateProject});
        }

        res.status(200).json ({
            message: `Project with ID ${req.params.id} has been updated successfully`,
            project: updateProject
        })

    } catch (error) {
        return res.status(400).send(error.message);
    }
}


// Endpoint to delete an event with a unique id
export const deleteProject = async (req, res) => {
    try {

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const deleteProject = await projectModel.findByIdAndDelete(req.params.id);
        if (!deleteProject) {
            return res.status(404).json("Project not found");
        }

        user.projects.pull(req.params.id);
        await user.save();
        
        res.status(200).json(`Project with ID ${req.params.id} has been deleted`);

    } catch (error) {
        next(error)
    }
}