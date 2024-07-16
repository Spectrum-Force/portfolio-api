import joi from "joi";


export const projectSchema = joi.object({

    // image: joi.string(),
    projectName: joi.string().required(),
    description: joi.string().required(),
    contributors: joi.string(),
    skills: joi.string(),
    link: joi.string(),
    nameOfInstitution: joi.string(),
    startDate: joi.string(),
    endDate: joi.string(),
    user: joi.string()

})

