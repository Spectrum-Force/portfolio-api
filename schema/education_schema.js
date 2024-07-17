import joi from "joi";

export const educationSchema = joi.object(
    {
        institutionName: joi.string().required(),
        location: joi.string(),
        program: joi.string().required(),
        qualification: joi.string().required(),
        grade: joi.string(),
        startDate: joi.string(),
        endDate: joi.string(),
        user: joi.string()
    }
);

