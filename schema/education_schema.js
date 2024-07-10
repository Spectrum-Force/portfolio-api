import joi from "joi";

const educationSchema = joi.object(
    {
        instutionName: joi.string().required(),
        location: joi.string(),
        program: joi.string().required(),
        qualification: joi.string().required(),
        grade: joi.string,
        startDate: joi.string(),
        endDate: joi.string(),
    }
);

