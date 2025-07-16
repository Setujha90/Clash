//The file is named as `route.ts` to handle NextAuth.js authentication routes in a Next.js application.

//This file is create to handle authentication routes in an Express application, it helps to manage user registration and login functionalities, including validation, hashing passwords, and sending verification emails.
import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };