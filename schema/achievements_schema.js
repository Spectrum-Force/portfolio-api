import joi from 'joi';


export const achievementSchema = joi.object({
    award: joi.string(),
    description: joi.string(),
    date: joi.string(),
    nameOfInstitution: joi.string(),
    user: joi.string()

});