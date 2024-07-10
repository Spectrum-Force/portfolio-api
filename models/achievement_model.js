import { Schema, model, Types } from 'mongoose'

const achievementSchema = new Schema({
    award: { type: String },
    description: { type: String },
    image: { type: String },
    date: { type: String },
    nameOfInstitution: { type: String },
    user: { type: Types.ObjectId, ref: 'User' }
});

export const achievementModel = model('Achievement', achievementSchema);