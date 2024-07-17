import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const projectSchema = new Schema({
    image: {type: String},
    projectName: { type: String },
    description: { type: String },
    contributors: { type: String },
    skills: { type: String },
    link: { type: String },
    nameOfInstitution: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: { type: Types.ObjectId, ref: 'User', select: false }
}, {
    timestamps: true
});

projectSchema.plugin(toJSON);

export const projectModel = model('Project', projectSchema);