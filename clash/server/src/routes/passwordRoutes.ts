import { Router, Request, Response } from "express";
import prisma from "../config/database.js";
import { forgotpasswordSchema, resetpasswordSchema } from "../validation/passwordValidations.js";
import { authLimiter } from "../config/rateLimit.js";
import { formatZodError, renderEmailEjs , checkDateHourDiff } from "../helper.js";
import { ZodError } from "zod";
import bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid'; 
import { emailQueue } from "../jobs/EmailJob.js";


const router = Router();

router.post('/forgot-password', authLimiter, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = forgotpasswordSchema.parse(body);
        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (!user || user === null) {
            res.status(422).json({
                errors: { email: "No user found with this email" }
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(uuid4(), salt);

        await prisma.user.update({
            where: {
                email: payload.email
            },
            data: {
                password_reset_token: token,
                token_send_at: new Date().toISOString()
        }
    })

    const url = `${process.env.CLIENT_URL}/reset-password/?email=${payload.email}&token=${token}`;

    const emailBody = await renderEmailEjs("forgot-password", { url: url });

    await emailQueue.add("emailQueueName", {to:payload.email, subject: "Reset your password", body: emailBody});

    res.json({
        message: "Password reset link sent to your email"
    });
        



    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
        
    }
})


router.post('/reset-password', authLimiter, async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = resetpasswordSchema.parse(body);
        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        if (!user || user === null) {
            res.status(422).json({
                message: "Invalid data",
                errors: { email: "Link is not correct make sure u copied correct link" }
            });
            return;
        }

        if(user.password_reset_token !== payload.token){
            res.status(422).json({
                message: "Invalid data",
                errors: { token: "Token is not correct make sure u copied correct link" }
            })
    }

    const checkhourdiff = checkDateHourDiff(user.token_send_at);
    if(checkhourdiff > 2){
        res.status(422).json({
            message: "Invalid data",
            errors: { token: "Token is expired, please request a new one" }
        });
        return;
    }

        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

        await prisma.user.update({
            where: {
                email: payload.email
            },
            data: {
                password: payload.password,
                password_reset_token: null,
                token_send_at: null
            }
        });

        res.json({
            message: "Password reset successfully! You can now login with your new password"
        });


} catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
        
    }
})


export default router;