// Import necessary modules
import { userProfileModel } from '../models/userProfile_model.js';
import { userProfileSchema } from '../schema/userProfile_schema.js';
import { userModel } from '../models/user_model.js';

// Create a new user profile
export const addUserProfile = async (req, res) => {

    try {

        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename,
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;

        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const profile = await userProfileModel.create({ ...value, user: userSessionId });

        user.userProfile = profile._id;
        await user.save();
        res.status(201).json({ profile })

    } catch (error) {
        return res.status(500).send(error);
    }
};



// Get a user profile by ID
export const getUserProfile = async (req, res) => {
    try {
        const userSessionId = req.session?.user?.id || req?.user.id;
        const userProfile = await userProfileModel.find({ user: userSessionId});

        if (!userProfile) {
            return res.status(404).send({profile: userProfile});
        }
        res.status(200).json({profile: userProfile})
       

    } catch (error) {
        return res.status(500).send(error.message)
    }
};

// Update a user profile by ID
export const updateUserProfile = async (req, res) => {

    try {
        const { error, value } = userProfileSchema.validate({ ...req.body,
           profilePicture: req.files.profilePicture[0].filename,
           resume: req.files.resume[0].filename,
        }); 

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session?.user?.id || req?.user.id;

        const user = await userModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }


        const updatedUserProfile = await userProfileModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedUserProfile) {
            return res.status(404).send('Profile not found');
        }

        res.status(201).json({ profile: updatedUserProfile });

    } catch (error) {
        return res.status(500).json(error.message);
    }


};

// Delete a user profile by ID
// export const deleteUserProfile = async (req, res) => {
//     try {

//         const deletedUserProfile = await userProfileModel.findByIdAndDelete(req.params.id);

//         if (!deletedUserProfile) {
//             return res.status(404).send('UserProfile not found');
//         }

//         return res.status(200).json({ userProfile: deletedUserProfile });

//     } catch (error) {
//         return res.status(500).send(error);
//     }
// };
