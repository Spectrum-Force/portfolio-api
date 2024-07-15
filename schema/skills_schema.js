import joi from 'joi';


export const skillsSchema = joi.object({

    name: joi.string(),
    levelOfProficiency: joi.string().valid('beginner', 'intermediate', 'advanced', 'expert'),
    user: joi.string()
});
