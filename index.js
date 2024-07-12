import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routers/user_routes.js";
import achievementRouter from "./routers/achievement_route.js";
import skillRouter from "./routers/skills_routes.js";
import educationRouter from "./routers/education_route.js";
import projectRouter from "./routers/project_route.js";

// Create the express app
const userApp = express();


// Connect to the database
dbConnection()

userApp.use(express.json())
userApp.use('/api/v1', userRouter)
userApp.use('/user/achievements', achievementRouter)
userApp.use('/user/skills', skillRouter)
userApp.use('/user/education', educationRouter)
userApp.use('/user/projects', projectRouter)

// Listen for incoming requests
userApp.listen(5050, () => {
    console.log('The app is listening on port 5050.')
})