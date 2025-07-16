import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod"; 
import { formatZodError, renderEmailEjs } from "../helper.js"; // Importing the helper function to format Zod errors.
import prisma from "../config/database.js"; // Importing the Prisma client instance to interact with the database.
import bcrypt from 'bcrypt'
import {v4 as uuid4} from 'uuid' // Importing uuid4 for generating unique identifiers,used in email verification or other unique ID needs.
import { emailQueue } from "../jobs/EmailJob.js";
import { error } from "console";

import jwt from 'jsonwebtoken'
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";

const router= Router();

//*Login Route
router.post('/login',authLimiter, async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        
        if(!user || user===null){
            res.status(422).json({
                errors: {email: "No user found with this email"}
            });
            return ;
        } 

        const compare = await bcrypt.compare(payload.password, user.password);
        if(!compare){
                res.status(422).json({
                errors : {email: "Invalid credentials"}
            })
            return ;
        }

        const JWTPayload = {
            id: user.id,
            email: user.email,
            name: user.name
        }

        const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {expiresIn: "365d"}); // 

        res.json({
            message: "Login successful",
            token: `Bearer ${token}`, // Returning the JWT token in the response, prefixed with "Bearer " for authentication purposes
        })

    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
})

//*Login Check
router.post('/check/credentials',authLimiter, async (req:Request, res:Response) => {
    try {
        const body = req.body;
        const payload = loginSchema.parse(body);
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        
        if(!user || user===null){
            res.status(422).json({
                errors: {email: "No user found with this email"}
            });
            return ;
        } 

        const compare = await bcrypt.compare(payload.password, user.password);
        if(!compare){
                res.status(422).json({
                errors : {email: "Invalid credentials"}
            })
            return ;
        }

        

        res.json({
            message: "Login successful",
            data: {

            }
        })

    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
})


//*Register Route
router.post('/register',authLimiter, async (req:Request, res:Response) => { 
    try { 
        const body = req.body; 
        const payload =registerSchema.parse(body); 
        let user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        
        if(user){
        res.status(422).json({
            errors: {
                email: "User already exist with this mail  id ,try with another mail id"
            },
            
        });
        return;
        }

        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        const token = await bcrypt.hash(uuid4(), salt); // Generate a unique token for the user, e.g., for email verification.

        await prisma.user.create({ 
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password, 
                email_verified_token: token, 
                
            }
        })
        const url = `${process.env.APP_URL}/verify/email?email=${payload.email}&token=${token}`; // Construct the verification URL using the app's base URL and the user's email and token.
        const emailBody = await renderEmailEjs("email-verify", {name: payload.name, url:url}); // Render the email body using the EJS template with the user's name and verification URL.
        await emailQueue.add("emailQueueName", {to:payload.email, subject: "Verify your email", body: emailBody}); // Add the email to the queue for sending.

        



        res.status(200).json({ message: "User registered successfully, please check your email to verify your account." }); 

        
    } catch (error) {
    if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
        
    }
})

//* Get User Profile
router.get('/user', AuthMiddleware, async (req: Request, res: Response) => {
    const user = req.user;
    res.json({
        data: user
    })
    return ;
})

export default router; // Exports the router to be used in other parts of the application.