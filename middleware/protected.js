import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()


export const protectedAction = (req, res, next) => { 
    const authHeader = req.headers.authorization;
    console.log("Auth", authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
        status: 'false',
        message: 'Authorization header missing or malformed',
        data: []
    });
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
        return res.status(401).json({
            status: 'false',
            message: 'Unauthorized',
            data: []
        })
    }
    req.user = decoded.payload
        next()
})
}