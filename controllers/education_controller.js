import { educationModel } from "./educationModel.js";
import { educcationSchema } from "./educationSchema.js";


// Endpoints to post education
export const postEducation = async (req, res, next) => {
    try {

        const { error, value } = educcationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        console.log('value', value)

        const newEducation = await educationModel(value);
        res.status(201).json({ education: newEducation });

    } catch (error) {
        next(error);
    }
}

// Endpoint to get all education
export const getEducation = async (req, res, next) => {
    try {

        const alleducation = await educationModel.find()
        if (alleducation.length === 0) {
            return res.status(404).send('Education not found');
        }
        res.status(200).json({education: alleducation});

    } catch (error) {
        next(error);
    }
};

// Endpoint to get a single education
export const getSingleEducation = async (req, res, next) => {
    try {
        const getSingleEducation = await educationModel.findById(req.params.id);
        if (!getSingleEducation) {
            return res.status(404).send('Education not found');
        }
        res.status(200).json('Education retrieved successfully');
    } catch (error) {
        next(error);
    }
}


// Endpoint to update the details of an education
export const updateEducation = async (req, res, next) => {
    try {

        const { error } = educcationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updateEducation = await educationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json('Education updated successfully');


    } catch (error) {
        next(error);
    }
}


// Endpoint to delete an education
export const deleteEducation = async (req, res, next) => {
    try {

        const deleteEducation = await educationModel.findByIdAndDelete(req.params.id);
        if (!deleteEducation) {
            return res.status(404).send('Education not found');
        }
        res.status(200).json('Education deleted successfully');

    } catch (error) {
        next(error);
    }
}