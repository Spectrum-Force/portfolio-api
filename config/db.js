import mongoose from "mongoose";
import 'dotenv/config'

const mongo_uri = process.env.MONGO_URL;

export const dbConnection = async () => {

    try {
        await mongoose.connect(mongo_uri)
        console.log('Database is connected')
    } catch (error) {
        console.log(error)
    }
}