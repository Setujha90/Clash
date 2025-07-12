"use server"
import { REGISTER_URL } from "@/lib/apiEndPoints"
import axios, { AxiosError } from "axios"

 //use server is used for server actions which indicates that this code will run on the server side, allowing access to server-side resources and APIs, this helps to send data to the server and perform actions like database operations, authentication, etc.

export async function registerAction(prevState: any, formData: FormData){ // Function to handle user registration
    // prevState is used to access the previous state of the form, if needed
    console.log("Form Data:", formData); 

    try {
        const {data} = await axios.post(REGISTER_URL,{ // Sending a POST request to the server to register a new user
            // The formData is used to send the user's registration details
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmpassword: formData.get("confirmpassword")
        
        })
        return {
            status: 200,
            message: data?.message ?? "User registered successfully, please check your email to verify your account.",
            errors: {} 
        }

    } catch (error) {

        if(error instanceof AxiosError){ // Checking if the error is an AxiosError, which is thrown by axios for HTTP errors
            if(error.response?.status === 422){
                
                return {
                    status: 422,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors
                }
            }
        }
        return {
            status: 500,
            message: "Internal Server Error",
            errors: {}
        }
    }
}