import { Schema, model, Types } from 'mongoose'

const skillSchema = new Schema({
    name: { type: String },
    levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
    user: { type: Types.ObjectId, ref: 'User' }
});

export const skillModel = model('Skill', skillSchema);