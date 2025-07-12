import {z} from "zod" // Importing zod for schema validation,it helps in defining and validating the structure of data,like user registration details. it is not empty, it is used to ensure that the data meets specific criteria before processing it further.

export const registerSchema = z.object({ 
    name: z.string({message: "Name is required."})
        .min(3, {message: "Name must be at lest 3 characteres long."}),
    
    email: z.string({message: "Email is required."})
        .email({message: "Invalid email format."}), 
        
    password: z.string({message: "Password is required."})
        .min(6, {message: "Password must be at least 6 characters long."}),
        
    confirmpassword: z.string({message: "Confirm password is required."})
        .min(6, {message: "Confirm password must be at least 6 characters long."}),   
}).refine((data) => data.password === data.confirmpassword, { 
    message: "Passwords do not match.", path: ["confirmpassword"] 
})