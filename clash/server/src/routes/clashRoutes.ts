import {Router, Request, Response} from "express";
import { ZodError } from "zod";
import { formatZodError, uploadFile,removeImage } from "../helper.js";  
import { clashSchema } from "../validation/clashValidations.js";

import { FileArray,UploadedFile } from "express-fileupload"; 
import { imageValidation } from "../helper.js"; 
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import prisma from "../config/database.js";

const router = Router();

router.get("/", AuthMiddleware, async (req: Request, res: Response) => {
try {
    const clashs = await prisma.clash.findMany({
    where: { userId: Number(req.user?.id) },
    });
    if (!clashs || clashs.length === 0) {
        res.status(404).json({ message: "No clashes found" });
        return;
    }
    res.json({ message: "Data Fetched", data: clashs });
    return ;

} catch (error) {
    res
    .status(500)
    .json({ error: "Something went wrong.please try again!" });
    return ;
}
});

router.get("/:id", AuthMiddleware, async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
    where: { id: Number(id) },
    });
    
    res.json({ message: "Clash Fetched successfully", data: clash });

} catch (error) {
    res
    .status(500)
    .json({ error: "Something went wrong.please try again!" });
}
});

router.put("/:id", AuthMiddleware, async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    const body = req.body;
    const payload = clashSchema.parse(body);
    if (req.files?.image) {
    const image: UploadedFile = req.files.image as UploadedFile;
    const validationError = imageValidation(image?.size, image?.mimetype);
    if (validationError) {
        res.status(422).json({ errors: { image: validationError } });
        return;
    }


      // * Delete Old Images
    const clash = await prisma.clash.findUnique({
        select: { id: true, image: true },
        where: { id: Number(id) },
    });
    if (!clash) {
        res.status(404).json({ message: "Clash not found" });
    }

    if (clash?.image) removeImage(clash?.image);
    payload.image = await uploadFile(image);
    }

    await prisma.clash.update({
    data: {
        ...payload,
        expires_at: new Date(payload.expires_at), 
    },
    where: { id: Number(id) },
    });

    res.json({ message: "Clash updated successfully!",
        data: {}
    });

} catch (error) {
    if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        } 
}
});

router.delete("/:id", AuthMiddleware, async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    const clash = await prisma.clash.findUnique({
    select: { image: true, userId: true },
        where: { id: Number(id) },
    });
    if (!clash) {
        res.status(404).json({ message: "Clash not found" });
        return;
    }

    if (clash.userId !== req.user?.id) {
    res.status(401).json({ message: "UnAuthorized" });
    }

    if (clash.image) removeImage(clash.image);

    await prisma.clash.delete({
    where: { id: Number(id) },
    });

    res.json({ message: "Clash Deleted successfully!" });

} catch (error) {
    if (error instanceof ZodError) {
            const formattedErrors = formatZodError(error);
            res.status(422).json({ errors: formattedErrors });
        } else {
            res.status(500).json({ message: "Internal server error" });
        } 
}
});


router.post("/", AuthMiddleware, async(req: Request, res: Response)=> {
    try {
        const body = req.body;
        const payload = clashSchema.parse(body); 

        if(req?.files?.image){
            const image = req?.files?.image as UploadedFile
            const validationError = imageValidation( image.size, image.mimetype);
            if(validationError){
                res.status(422).json({
                    errors: {image: validationError}
                });
                return ;
            }
            payload.image = await uploadFile(image);
        }
        else{
            res.status(422).json({
                errors: {image: "Image is required"}    
        })
    }
        await prisma.clash.create({
            data: {
                title: payload.title,
                description: payload.description,
                expires_at: new Date(payload.expires_at),
                image: payload.image,
                userId: Number(req.user.id)
            }
        });

        res.json({
            message: "Clash created successfully",
            data: {}
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

export default router;