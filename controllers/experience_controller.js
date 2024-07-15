
import { experienceModel} from "../models/experience_model.js"
import { userModel } from "../models/user_model.js";
import { experinceSchema } from "../schema/experince_schema.js"



// Endpoints to post experience
export const addExperience = async (req, res) => {
    try {
        const { error, value } = experinceSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }


        const user = await userModel.findById(userSessionId);
        if(!user) {
            return res.status(404).send('User not found')
        }

        const experience = await experienceModel.create({...value, user: userSessionId});

        user.experiences.push(experience._id);
        await user.save();

        res.status(201).json({ experience });
    }

    catch (error) {
        return res.status(500).send(error)
    }
};

// Endpoint to get all experience
export const getExperience = async (req, res) => {
    try {

        const userSessionId = req.session.user.id;
        const userId = req.params.id;
        const allExperience = await experienceModel.find({ user: userId })

        if (allExperience.length == 0) {
            return res.status(404).send('No experience found')
        }

    } catch (error) {
        return res.status(500).send(error)
    }
};


// Endpoint to get a single experience
export const getSingleExperience = async (req, res) => {
    try {

        const getSingleExperience = await experienceModel.findById(req.params.id);

        res.status(200).json(getSingleExperience)

    } catch (error) {
        return res.status(500).send(error)
    }
}

// Endpoint to update the details of an experience
export const updateExperience = async (req, res, next) => {
    try {

        const { error, value } = experinceSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)

        const updateExperience = await experienceModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json(updateExperience)

    } catch (error) {
        next(error)
    }
}


// Endpoint to delete an experience
export const deleteExperience = async (req, res, next) => {

    try {


        const deleteExperience = await experienceModel.findByIdAndDelete(req.params.id);
        if (!deleteExperience) {
            return res.status(404).send('Experience not found')
        }
        return res.status(200).json({ experience: deleteExperience })

    }

    catch (error) {
        next(error);
    }
};
