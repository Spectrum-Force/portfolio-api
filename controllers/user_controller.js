import * as bcrypt from "bcrypt";
import { userModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";


// Create a function for the signup
export const signup = async (req, res) => {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    // Check if the user exists in the database using their email
    // Get the user email from the value. NB: The req.body is in the value
    const email = value.email
    // console.log('email', email)

    const findIfUserExist = await userModel.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('User has already signed up')
    } else {

        // Hash the password
        const hashedPassword = await bcrypt.hash(value.password, 12)
        // Create a new object which will contain the hashed password
        // const {firstName, lastName, email, userName, otherNames, password: hashedPassword}
        value.password = hashedPassword
        // value.confirmedPassword = hashedPassword
        
       
        // Create the new user
        const addUser = await userModel.create(value)
        req.session.user = {id: addUser.id}
        return res.status(201).send(addUser)
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, userName, password} = req.body
        // Find a user using their unique identifier
        const user = await userModel.findOne({
            $or: [
                {email: email},
                {username: userName}
            ]
        });
        if (!user) {
            return res.status(401).json('No user found')
        } else {
            // Verify their password
            const correctPassword = bcrypt.compareSync(password, user.password);
            if(!correctPassword) {
                res.status(401).json('Invalid credentials')
            } else {
                // Generate a session for them
                req.session.user = {id: user.id}

                console.log('user', req.session.user)
                // Return response
                res.status(201).json('Login successful')
            }
        }
    } catch (error) {
        next(error);
    }
 }

// Function to get the details of a particular user
export const getUser = async (req, res, next) => {
    // we are fetching all users
    try {
        const userId = req.params.userId

        //get user based on the user id
        //use the select to exclude the password
        //use populate to populate the education
        const userDetails = await userModel.find({userId})
        .select('-password')
        .populate('education')
        .populate('skills')
        .populate('achievements')
        .populate('projects')
        .populate('userProfile')
        .populate('experiences')
        
        return res.status(201).json({user: userDetails})
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        // Destroy user session
        await req.session.destroy();
        // Return response
        res.status(200).json('Logout successful')
    } catch (error) {
        next(error);
    }
 }

export const profile = async (req, res, next) => {
    try {
        // Find a user by id
        const user = await userModel
        .findById(req.session.user.id)
        .select({password: false});
        // Return response
        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
 }