import {z} from "zod" 

export const forgotpasswordSchema = z.object({
    email: z.string({message: "Email is required."})
        .email({message: "Email must be a correct "}), 
        
})

export const resetpasswordSchema = z.object({ 
    email: z.string({message: "Email is required."})
    .email({message: "Invalid email format."}), 
    token: z.string({message: "Token is required."}),
        
    password: z.string({message: "Password is required."})
        .min(6, {message: "Password must be at least 6 characters long."}),
        
    confirmpassword: z.string({message: "Confirm password is required."})
        .min(6, {message: "Confirm password must be at least 6 characters long."}),   
}).refine((data) => data.password === data.confirmpassword, { 
    message: "Passwords do not match.", path: ["confirmpassword"] 
})