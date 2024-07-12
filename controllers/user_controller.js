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
    console.log('email', email)

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
        return res.status(201).send(addUser)
    }
}