import joi, { link }  from "joi";


const projectSchema = joi.object({
    
    projectName: joi.string(),
    description: joi.string(),
    contributors: joi.string(),
    skills: joi.string(),
    link: joi.string(),
    nameOfInstitution: joi.string(),
    startDate: joi.string(),
    endDate: joi.string(),

})

