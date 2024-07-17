import { achievementModel } from "../models/achievement_model.js";
import { achievementSchema } from "../schema/achievements_schema.js";
import { userModel } from "../models/user_model.js";

// Create a function to post an achievement
export const addAchievement = async (req, res) => {
    try {

        const {error, value} = achievementSchema.validate({
            ...req.body,
            image: req.files.image[0].filename,
        });
        if(error){

            return res.status(400).send(error.details[0].message)
        }

        const userSessionId = req.session.user.id;

        //after, find the user with the id that you passed when creating the education
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send('User not found')
        }

        // create achievement with the value

        const achievement = await achievementModel.create({
            ...value,
            user: userSessionId
        });


        // if you find the user, push the achievement id you just created inside
        user.achievements.push(achievement._id);

        // and save the user now with the achievementId
        await user.save();

        // return the achievement
        res.status(201).json({ achievement })
    } catch (error) {
        return res.status(500).send(error)
    }
}

// Function to update an achievement
export const patchAchievement = async (req, res, next) => {
    try {
        const { error, value } = achievementSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const updatedAchievement = await achievementModel.findByIdAndUpdate(req.params.id, value, { new: true })
        if (!updatedAchievement) {
            return res.status(404).send("Achievement not found");
        }
        // Return response
        res.status(200).json({ achievement: updatedAchievement })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

// Function to get all achievements
export const getAchievements = async (req, res) => {
    try {
        // we are fetching education that belongs to a particular user
        const userSessionId = req.session.user.id

        const allAchievements = await achievementModel.find({ user: userSessionId })
        if (allAchievements.length == 0) {
            return res.status(404).send('No achievement added')
        }
        // Return all achievements
        res.status(200).json({ Achievements: allAchievements })
    } catch (error) {
        return res.status(500).send('Internal error')
    }
}

// Get an achievement by a unique id
export const getOneAchievement = async (req, res, next) => {
    try {
        const oneAchievement = await achievementModel.findById(req.params.id)
        res.status(200).json(oneAchievement);
    } catch (error) {
        next(error)
    }
}

// Function to delete a skill with a unique ID
export const deleteAchievement = async (req, res) => {
    try {

        const userSessionId = req.session.user.id;
        const user = await userModel.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const achievement = await achievementModel.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).send("Achievement not found")
        }

        user.achievements.pull(req.params.id);
        await user.save();

        res.status(200).send(`Achievement with ID ${req.params.id} has been deleted`)
    } catch (error) {
        return res.status(500).json({error})
    }
};