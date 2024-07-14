// Import necessary modules
import { userProfileModel } from '../models/userProfile_model.js';
import { userProfileSchema } from '../schema/userProfile_schema.js';
import { User } from '../models/user_model.js';

// Create a new user profile
export const addUserProfile = async (req, res) => {

    try {
        const { error, value } = userProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    

    // Check if the user exists
    const userSessionId = req.session.user.id;

    const user = await User.findById(userSessionId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    
    const newUserProfile = await userProfileModel.create(value)

    // object.assign.newUserProfile
    user.userProfile = newUserProfile._id;
    // user.userProfile.push(newUserProfile._id);

    await user.save();

    res.status(201).json({ newUserProfile});

    } catch (error) {
        return res.status(500).send(error);
    }
};



// Get a user profile by ID
export const getUserProfile = async (req, res) => {
    try {
        const userProfile = await userProfileModel.findById(req.params.id);

        if (!userProfile) {
            return res.status(404).send('UserProfile not found');
        }
        return res.status(404).send('UserProfile not found');

    } catch (error) {
        return res.status(500).send(error)
    }
};

// Update a user profile by ID
export const updateUserProfile = async (req, res) => {
   
    try {
        const { error, value } = userProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const updatedUserProfile = await userProfileModel.findByIdAndUpdate(userSessionId);
        if (!updatedUserProfile) {
            return res.status(404).send('UserProfile not found');
        }
        return res.status(200).json({ userProfile: updatedUserProfile });

    } catch (error) {
        returnres.status(500).send(error);
    }

   
};

// Delete a user profile by ID
export const deleteUserProfile = async (req, res) => {
    try {

        const deletedUserProfile = await userProfileModel.findByIdAndDelete(req.params.id);

        if (!deletedUserProfile) {
            return res.status(404).send('UserProfile not found');
        }

        return res.status(200).json({ userProfile: deletedUserProfile });

    } catch (error) {
        return res.status(500).send(error);
    }
};