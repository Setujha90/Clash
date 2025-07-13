//This file is create to remove the error that is showing in authmiddleware.ts file that req.user is not assignable to type Request, so we are creating a custom type for Request that includes user property.

interface AuthUser {
    id: Number;
    email: string;  
    name: string;
}

declare namespace Express { // Extend the Express namespace to include the custom user property
    interface Request {
        user?: AuthUser; // Optional user property of type AuthUser
    }

}

