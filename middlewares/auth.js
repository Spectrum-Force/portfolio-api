import jwt from "jsonwebtoken"

export const checkUserSession = (req, res, next) => {
    // Check if session has user
    if (req.session.user) {
        next();
    } else if (req.headers.authorization) {
        try {
            // Extract token from headers
            const token = req.headers.authorization.split(' ')[1];
            // Verify the token to get user and append user to request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            
            // Call next function
            next();
        } catch (error) {
            res.status(401).json(error)
        }
    } else {
        return res.status(401).json('User not authenticated');
    }
} 