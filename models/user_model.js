import { Schema, model } from 'mongoose'

const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        // confirmedPassword: {type: String},
        userName: { type: String, unique: true },
        termsAndConditions: { type: Boolean }
});

export const userModel = model('User', userSchema);