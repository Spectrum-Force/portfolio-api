import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const experienceSchema = new Schema({
    companyName: { type: String },
    role: { type: String },
    responsibility: { type: String },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: { type: Types.ObjectId, ref: 'User', select: false }
}, {
    timestamps: true
});

experienceSchema.plugin(toJSON)

export const experienceModel = model('Experience', experienceSchema);