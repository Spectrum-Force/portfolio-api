import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routers/user_routes.js";

// Create the express app
const userApp = express();


// Connect to the database
dbConnection()

userApp.use(express.json())
userApp.use('/api/v1', userRouter)

// Listen for incoming requests
userApp.listen(5050, () => {
    console.log('The app is listening on port 5050.')
})