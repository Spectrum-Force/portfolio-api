import jwt from "jsonwebtoken"

export const checkUserSession = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            // Extract token from headers
            const token = req.headers.authorization.split(' ')[1]

            // Verify the token to get user and append user to request

            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

            next()
        } catch (error) {
            return res.status(401).json({ error: "Token Expired" })
        }
    }
    else {
        res.status(401).json({ error: 'Not authenticated' })
    }
}