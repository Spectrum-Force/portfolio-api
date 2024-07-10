import joi from 'joi';


export const userProfileSchema = joi.object(
    {
        profilePicture: joi.string(),
    location: joi.string(),
    maritalStatus: joi.string().valid('single', 'married', 'prefer-not-to-stay'),
    sex: joi.string().valid('male', 'female'),
    bio: joi.string(),
    about: joi.string(),
    dateOfBirth: joi.date(),
    contact: joi.string(),
    resume: joi.string(),    
    github: joi.string().uri(),
    linkedin: joi.string().uri(),
    twitter: joi.string().uri()

});








