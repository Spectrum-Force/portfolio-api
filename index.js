import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routers/user_routes.js";
import achievementRouter from "./routers/achievement_route.js";
import skillRouter from "./routers/skills_routes.js";
import educationRouter from "./routers/education_route.js";
import projectRouter from "./routers/project_route.js";
import experienceRouter from "./routers/experience_router.js";
import expressOasGenerator from 'express-oas-generator';
import userProfileRouter from "./routers/userProfile_route.js";

// Create the express app
const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','userProfile', 'skills', 'projects', 'volunteering', 'experiences', 'education', 'achievements'],
    mongooseModels: mongoose.modelNames(), 
})

const PORT = process.env.PORT || 5050

// Apply middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5050'}));

app.use(
    session({
    secret: process.env.SESSION_SECRET, //encrypts the file
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true}
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "UP" });
  });

// Use routes
app.use('/api/v1', userRouter)
app.use('/api/v1', educationRouter)
app.use('/api/v1', achievementRouter)
app.use('/api/v1', skillRouter)
app.use('/api/v1', projectRouter)
app.use('/api/v1', experienceRouter)
app.use('/api/v1', userProfileRouter)
// userApp.use('//api/v1', volunteeringRouter)

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

// Connect to the database
dbConnection();


// Listen for incoming requests
app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`)
})