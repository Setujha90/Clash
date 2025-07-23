"use server"
import { REGISTER_URL , LOGIN_URL, CHECK_CREDENTIALS_URL, FORGOT_PASSWORD_URL, RESET_PASSWORD_URL} from "@/lib/apiEndPoints"
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

export async function loginAction(prevState: any, formData: FormData) {
  try {
    await axios.post(CHECK_CREDENTIALS_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return {
      status: 200,
      message: "Credentials matched loging you shortly!",
      errors: {},
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
      data: {},
    };
  }
}

// export async function loginAction(prevState: any, formData: FormData){ 
//     console.log("Form Data:", formData); 

//     try {
        
//         const {data} = await axios.post(CHECK_CREDENTIALS_URL,{ 
//             email: formData.get("email"),
//             password: formData.get("password"),
//         })
//       //  console.log("Login Response Data:", data); // Log the response data for debugging
//         return {
//             status: 200,
//             message: data?.message ?? "Login success",
//             errors: {} ,
//             data: {
//                 email: data?.email ?? formData.get("email"),
//                 password: data?.password ?? formData.get("password"),
//             }
//         }

//     } catch (error) {

//         if(error instanceof AxiosError){ 
//             if(error.response?.status === 422){
                
//                 return {
//                     status: 422,
//                     message: error.response?.data?.message,
//                     errors: error.response?.data?.errors,
//                     data: {}
//                 }
//             }
//         }
//         return {
//             status: 500,
//             message: "Internal Server Error",
//             errors: {},
//             data: {}
//         }
//     }
// }


export async function forgotpassAction(prevState: any, formData: FormData){ 
    console.log("Form Data:", formData); 

    try {
        
        const {data} = await axios.post(FORGOT_PASSWORD_URL,{ 
            email: formData.get("email"),
        
        })
        return {
            status: 200,
            message: data?.message ?? "Password reset link sent to your email.Please check your email.",
            errors: {} ,
        
        }

    } catch (error) {

        if(error instanceof AxiosError){ 
            if(error.response?.status === 422){
                
                return {
                    status: 422,
                    message: error.response?.data?.message,
                    errors: error.response?.data?.errors,
                    data: {}
                }
            }
        }
        return {
            status: 500,
            message: "Internal Server Error",
            errors: {},
            data: {}
        }
    }
}

export async function resetpassAction(prevState: any, formData: FormData){ 
    console.log("Form Data:", formData); 

    try {
        
        const {data} = await axios.post(RESET_PASSWORD_URL,{  
            email: formData.get("email"),
            password: formData.get("password"),
            confirmpassword: formData.get("confirmpassword"),
            token: formData.get("token")

        })
        return {
            status: 200,
            message: data?.message ?? "Password reset successfully.Now you can login with your new password.",
            errors: {} 
        }

    } catch (error) {

        if(error instanceof AxiosError){ 
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