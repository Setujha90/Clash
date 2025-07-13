import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";    

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; // Extracting the authorization header from the request headers
    if (authHeader===null || authHeader===undefined) { // Checking if the authorization header is present
         res.status(401).json({status:401, message: "Unauthorized" }); // If the header is missing, respond with a 401 Unauthorized status
    }

    const token = authHeader.split(" ")[1]; // Extracting the token from the authorization header

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => { // Verifying the token using the JWT secret
        if (err) {
            res.status(403).json({status:403, message: "Forbidden" }); // If verification fails, respond with a 403 Forbidden status
        }
        req.user = user as AuthUser; //we define custom-types.d.ts to customize req.user for Request  // If verification is successful, attach the user information to the request object
        next(); // Call the next middleware or route handler
    })

}

export default AuthMiddleware; 

