// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const bcrypt = require("bcrypt");

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create two dummy articles
    const pass = await bcrypt.hash("passadmin", 10);
    const pass2 = await bcrypt.hash("passcost", 10);
    const mailVal = 'admin@peopaygo.com'
    const mailVal2 = 'admin@customer.com'

    const user = await prisma.user.upsert({
        where: { mail:  mailVal},
        update: {},
        create: {
            mail: mailVal,
            password: pass,
            access: 1
        },
    })

    const user2 = await prisma.user.upsert({
        where: { mail:  mailVal2},
        update: {},
        create: {
            mail: mailVal2,
            password: pass2,
            access: 0
        },
    })
    

    console.log({ user, user2 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
