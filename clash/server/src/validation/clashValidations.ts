import {z} from "zod" 



export const clashSchema = z.object({ 
    title: z.string({message: "Title is required."})
        .min(3, {message: "Title must be at lest 3 characteres long."})
        .max(50, {message: "Title must not exceed 100 characters."}),
    
    description: z.string({message: "Description is required."})
        .min(10, {message: "Description must be at least 10 characters long."})
        .max(500, {message: "Description must not exceed 500 characters."}),
        
    expires_at: z.string({message: "Expired at  is required."})
        .min(5, {message: "Please pass correct date."}),

    image: z.string().optional()
        
    
})