import { skillModel } from "../models/skills_model.js";
import { skillsSchema } from "../schema/skills_schema.js";

// Create a function to post a skill
export const addSkill = (req, res, next) => {
    try {
        const {error, value} = skillsSchema.validate(req.body)
        if(error) {
            return res.status(400).send(error.details[0].message)
        }
        const addData = skillModel.create(req.body)
        // return response
        res.status(200).send(addData)
    } catch (error) {
        next(error)
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
        res.json(updatedSkill)
    } catch (error) {
        next(error)
    }
}

// Create a function to get all skills
export const getSkills = async (req, res) => {
    try {
        const allSkills = await skillModel.find()
        if(allSkills.length == 0) {
            res.status(404).send('No skills added')
        }
        // Return all skills
        res.status(200).json({skills: allSkills})
    } catch (error) {
        return res.status(500).send('Internal error')
    }
}

// Get a skill by a unique id
export const getSkill = async (req, res, next) => {
    try {
        const skill = await skillModel.findById(req,params.id)
        if(skill.length == 0) {
            res.status(404).send(`No skill with ${req.params.id} exists`)
        }
        res.status(200).json(skill);
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