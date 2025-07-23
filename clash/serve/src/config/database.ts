import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ // Prisma Client instance with custom configuration, creating a connection to the database.we are using Prisma ORM to interact with the database and perform CRUD operations.
    log : ["query", "error"] ,// console the queries and errors
    errorFormat: "pretty" ,
})

export default prisma;