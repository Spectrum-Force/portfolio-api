import joi from 'joi';



export const volunteeringSchema = joi.object(
    { 
        
    organization: joi.string(),
    description: joi.string(),
    skills: joi.string(),
    role: joi.string(),
    responsibility: joi.string(),
    location: joi.string(),
    startDate: joi.string(),
    endDate: joi.string(),
    projectName: joi.string(),
}
);

