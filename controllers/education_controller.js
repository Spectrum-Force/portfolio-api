import { educationModel } from "../models/education_model.js";
import { educationSchema } from "../schema/education_schema.js";

// Endpoints to post education
export const postEducation = async (req, res) => {
    try {

        const { error, value } = educationSchema.validate(req.body);
        if (error) {

            return res.status(400).send(error.details[0].message);
        }

        const newEducation = await educationModel.create(value);
        res.status(201).json({ education: newEducation });

        console.log('userId', req.session.user.id);
        // Log the user ID from the session

        const userSessionId = req.session.user.id;




        const user = await User.findById(userSessionId);
        // Find the user in the database using the user ID from the session
        if (!user) {
            return res.status(404).send('User not found');
        }

        const education = await educationModel.create({ ...value, user: userSessionId });
        
        user.education.push(education._id);

        // Add the ID of the newly created education document to the user's education array
        await user.save();
        

        res.status(201).json({ education });
        


    } catch (error) {
        return res.status(500).send(error);
    }

}

// Endpoint to get all education
export const getEducation = async (req, res) => {
    try {


        const userSessionId = req.session.user.id;
        const alleducation = await educationModel.find({ user: userSessionId });


        const userId =  req.params.id;
        const alleducation = await educationModel.find({user: userId});
        

        if (alleducation.length === 0) {
            return res.status(404).send('No education added');
        }
        res.status(200).json({ education: alleducation })

    } catch (error) {
        return res.status(500).send(error);
    }
};

// Endpoint to get a single education
export const getSingleEducation = async (req, res) => {
    try {
        const getSingleEducation = await educationModel.findById(req.params.id, req.body, { new: true });
        
        res.status(200).json(getSingleEducation);

    } catch (error) {
        next(error);
    }
}


// Endpoint to update the details of an education
export const updateEducation = async (req, res, next) => {
    try {

        const { error } = educationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updateEducation = await educationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateEducation);


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