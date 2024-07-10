import { userModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";

// Create a function for the signup
export const signup = (req, res) => {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
}