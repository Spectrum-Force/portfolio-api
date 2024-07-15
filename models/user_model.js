import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, lowercase: true, unique: true },
        password: { type: String, select: false },
        // confirmedPassword: {type: String},
        userName: { type: String, lowercase: true, unique: true },
        termsAndConditions: { type: Boolean },
        education: [{type: Types.ObjectId, ref: 'Education'}],
        skills: [{type: Types.ObjectId, ref: 'Skill'}],
        achievements: [{type: Types.ObjectId, ref: 'Achievement'}],
        projects: [{type: Types.ObjectId, ref: 'Project'}],
        userProfile: [{type: Types.ObjectId, ref: 'UserProfile'}],
        volunteering: [{type: Types.ObjectId, ref: 'Volunteering'}],
        experiences: [{type: Types.ObjectId, ref: 'Experiences'}]
}, {
        timestamps: true
});

userSchema.plugin(toJSON);

export const userModel = model('User', userSchema);