import joi from 'joi';

export const experinceSchema = joi.object({
    companyName: joi.string(),
    role: joi.string(),
    responsibility: joi.string(),
    location: joi.string(),
    startDate: joi.date(),
    endDate: joi.date()

});