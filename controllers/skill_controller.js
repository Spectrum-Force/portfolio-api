import { skillModel } from "../models/skills_model.js";
import { userModel } from "../models/user_model.js";
import { skillsSchema } from "../schema/skills_schema.js";

// Create a function to post a skill
export const addSkill = async (req, res) => {
    try {
        const {error, value} = skillsSchema.validate(req.body)
        if(error) {
            return res.status(400).send(error.details[0].message)
        }

        // Create skill with the value
        const skill = await skillModel.create(value)
        // after, find the user with the id tht you passed when creating the skills
        const user = await userModel.findById(value.user);
        if(!user) {
            return res.status(404).send('User not found');
        }

        // if you find the user, push the education id you just created inside
        user.skill.push(skill._id);

        // and save the user now with skillId
        await user.save();

        // return the skill
        res.status(201).send({skill})

    } catch (error) {
        return res.status(500).send(error)
    }
}

// Function to update a skill
export const patchSkill = async (req, res, next) => {
    try {
        const {error, value} = skillsSchema.validate(req.body)
        if(error) {
            return res.status(400).json(error.details[0].message)
        }
        const updatedSkill = await skillModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        // Return response
        res.status(200).json(updatedSkill)
    } catch (error) {
        next(error)
    }
}

// Create a function to get all skills
export const getSkills = async (req, res) => {
    try {
        // we are fetching skills that belong to a particular user
        const userId = req.params.id
        const allSkills = await skillModel.find({user: userId})
        if(allSkills.length == 0) {
            return res.status(404).send('No skills added')
        }
        // Return all skills
        res.status(200).json({skills: allSkills})
    } catch (error) {
        return res.status(500).send('Internal error')
    }
}

// Get a skill by a unique id
export const getOneSkill = async (req, res, next) => {
    try {
        const oneSkill = await skillModel.findById(req,params.id)
        res.status(200).json({skill: oneSkill});
    } catch (error) {
        next(error)
    }
}

// Function to delete a skill with a unique ID
export const deleteSkill = async (req, res, next) => {
    try {
        const deleteData = await skillModel.findByIdAndDelete(req.params.id)
        res.status(200).send(`Skill with ID ${req.params.id} has been deleted`)
    } catch (error) {
        next(error)
    }
}