import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log : ["query", "error"] ,// console the queries and errors
    errorFormat: "pretty" ,
})

export default prisma;