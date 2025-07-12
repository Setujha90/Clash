import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/authValidations.js";
import { ZodError } from "zod"; 
import { formatZodError, renderEmailEjs } from "../helper.js"; // Importing the helper function to format Zod errors.
import prisma from "../config/database.js"; // Importing the Prisma client instance to interact with the database.
import bcrypt from 'bcrypt'
import {v4 as uuid4} from 'uuid' // Importing uuid4 for generating unique identifiers,used in email verification or other unique ID needs.
import { emailQueue } from "../jobs/EmailJob.js";

const router= Router();
//*Register Route
router.post('/register', async (req:Request, res:Response) => { 
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
        const url = `${process.env.APP_URL}/verify/email?email=${payload.email}&token=${token}`; // Construct the verification URL using the app's base URL and the user's email and token.
        const emailBody = await renderEmailEjs("email-verify", {name: payload.name, url:url}); // Render the email body using the EJS template with the user's name and verification URL.
        await emailQueue.add("emailQueueName", {to:payload.email, subject: "Verify your email", body: emailBody}); // Add the email to the queue for sending.

        await prisma.user.create({ 
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password, 
                email_verified_token: token, 
                
            }
        })



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

export default router; // Exports the router to be used in other parts of the application.