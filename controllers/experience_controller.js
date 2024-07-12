import { expereinceModel } from "./expereinceModel.js"
import { userModel } from "./userModel.js"
import { expereinceSchema } from "./expereinceSchema.js"


// Endpoints to post experience
export const addExperience = async (req, res) => {
    try {
        const { error, value } = expereinceSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const newExpereince = new expereinceModel(value);

        const User = await userModel.findById(value.user);
        if (!User) {
            return res.status(404).send('User not found')
        }

        User.experience.push(newExpereince._id);
        await newExpereince.save();

        res.status(201).json({ experience: newExpereince });

    }

    catch (error) {
        return res.status(500).send(error)
    }
}

// Endpoint to get all experience
export const getExperience = async (req, res) => {
    try {

        const userId = req.params.id;
        const allExperience = await expereinceModel.find({ user: userId })

        if (allExperience.length == 0) {
            return res.status(404).send('No experience found')
        }

        res.status(200).json({ experience: allExperience })



    } catch (error) {
        return res.status(500).send(error)
    }
}


// Endpoint to get a single experience
export const getSingleExperience = async (req, res) => {
    try {

        const getSingleExperience = await expereinceModel.findById(req.params.id);

        res.status(200).json(getSingleExperience)

    } catch (error) {
        return res.status(500).send(error)
    }
}

// Endpoint to update the details of an experience
export const updateExperience = async (req, res, next) => {
    try {

        const { error, value } = expereinceSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)

        const updateExperience = await expereinceModel.findByIdAndUpdate(req.params.id, value)
        res.status(200).json({ experience: updateExperience })

    } catch (error) {
        next(error)
    }
}


// Endpoint to delete an experience
export const deleteExperience = async (req, res, next) => {

    try {


        const deleteExperience = await expereinceModel.findByIdAndDelete(req.params.id);
        if (!deleteExperience) {
            return res.status(404).send('Experience not found')
        }
        res.status(200).json({ experience: deleteExperience })

    }

    catch (error) {
        next(error);
    }
};