import { Schema, model, Types } from "mongoose"

const educationSchema = new Schema({
    institutionName: { type: String },
    location: { type: String },
    program: { type: String },
    qualification: { type: String },
    grade: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user: {type: Types.ObjectId, ref: 'User'}
});

export const educationModel = model('Education', educationSchema);