/* backend\src\lib\prisma.orm.ts */

// Import prisma client class
import { PrismaClient } from "@prisma/client";

// Create an instance of prisma client to use its features
const prisma = new PrismaClient();

export default prisma;
