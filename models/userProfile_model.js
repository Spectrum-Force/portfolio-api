import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const userProfileSchema = new Schema({
    profilePicture: { type: String },
    location: { type: String },
    maritalStatus: { type: String, enum: ['single', 'married', 'prefer-not-to-stay'] },
    sex: { type: String, enum: ['male', 'female'] },
    bio: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date },
    contact: { type: String },
    resume: { type: String },
    languages: [{type: String}],
    githubLink: {type: String},
    linkedinLink: {type: String},
    twitterLink: {type: String},
    user: {type: Types.ObjectId, ref: 'User', select: false, unique: true}
}, {
    timestamps: true
});

userProfileSchema.plugin(toJSON);

export const userProfileModel = model('UserProfile', userProfileSchema);