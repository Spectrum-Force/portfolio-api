import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";


// Create a function for the signup
export const signup = async (req, res) => {

    const { error, value } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // Check if the user exists in the database using their email
    // Get the user email from the value. NB: The req.body is in the value
    const email = value.email
    const findIfUserExist = await userModel.findOne({ email })
    if (findIfUserExist) {
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
        req.session.user = { id: addUser.id }
        return res.status(201).send(addUser)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, userName, password } = req.body
        // Find a user using their unique identifier
        const user = await userModel.findOne({
            $or: [
                { email },
                { userName }
            ]
        });
        if (!user) {
            return res.status(401).json('No user found')
        }
        // Verify their password
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials')
        }
        // Generate a session for them
        req.session.user = { id: user.id }

        // Return response
        return res.status(201).json('Login successful')


    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const token = async (req, res, next) => {
    try {
        const { email, userName, password } = req.body
        // Find a user using their unique identifier
        const user = await userModel.findOne({
            $or: [
                { email },
                { userName }
            ]
        });
        if (!user) {
            return res.status(401).json('No user found')
        }
        // Verify their password
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials')
        }
        // Generate a token
        const token = jwt.sign(
            {id: user.id}, 
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '3h'}
        );

        // Return response
        return res.status(201).json({
            message: 'User logged in',
            accessToken: token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName
            }
        })


    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Function to get the details of a particular user
export const getUser = async (req, res, next) => {
    // we are fetching all users
    try {
        const userName = req.params.userName.toLowerCase();

        //get user based on the user id
        //use the select to exclude the password
        //use populate to populate the education
        const options = {sort: {startDate: -1}}
        const userDetails = await userModel.findOne({ userName }).select("-password")
            .populate({
                path: "education",
                options,
            })
            .populate("userProfile")
            .populate("skills")

            .populate({
                path: "achievements",
                options: { sort: {date: -1}},
            })
            .populate({
                path: "experiences",
                options,
            });

    return res.status(200).json({ user: userDetails });
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req, res) => {
 

    const email = req.query.email?.toLowerCase()
    const userName = req.query.userName?.toLowerCase();
  
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (userName) {
      filter.userName = userName;
    }
  
    const users = await userModel.find(filter);
  
    return res.status(200).json({ users });
  };

export const logout = async (req, res, next) => {
    try {
        // Destroy user session
        await req.session.destroy();
        // Return response
        return res.status(200).json('Logout successful')
    } catch (error) {
        next(error);
    }
}

