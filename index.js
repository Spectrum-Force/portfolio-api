import express from "express";
import { dbConnection } from "./config/db";

// Create the express app
const userApp = express();

// Connect to the database
dbConnection()

// Listen for incoming requests
userApp.listen(5050, () => {
    console.log('Database is connected.')
})