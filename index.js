import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routers/user_routes.js";
import achievementRouter from "./routers/achievement_route.js";
import skillRouter from "./routers/skills_routes.js";
import educationRouter from "./routers/education_route.js";
import projectRouter from "./routers/project_route.js";
import experienceRouter from "./routers/experience_router.js";

// Create the express app
const userApp = express();


// Connect to the database
dbConnection();

// Apply middlewares
userApp.use(express.json());
userApp.use(session({
    secret: process.env.SESSION_SECRET, //encrypts the file
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true}
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

// Use routes
userApp.use('/api/v1', userRouter)
userApp.use('/api/v1', educationRouter)
userApp.use('/api/v1', achievementRouter)
userApp.use('/api/v1', skillRouter)
userApp.use('/api/v1', projectRouter)
userApp.use('/api/v1', experienceRouter)
// userApp.use('//api/v1', volunteeringRouter)



const port = process.env.PORT || 5050

// Listen for incoming requests
userApp.listen(port, () => {
    console.log(`The app is listening on port ${port}`)
})