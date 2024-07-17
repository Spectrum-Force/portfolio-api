import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const achievementSchema = new Schema({
    award: { type: String },
    description: { type: String },
    date: { type: String },
    nameOfInstitution: { type: String },
    user: { type: Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

achievementSchema.plugin(toJSON);

export const achievementModel = model('Achievement', achievementSchema);