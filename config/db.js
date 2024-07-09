import mongoose from "mongoose";
import 'dotenv/config'

const mongoUri = process.env.MONGO_URL;

export const dbConnection = () => {
    mongoose.connect(mongoUri).then(() => {
        console.log('Database is connected')
    })
}