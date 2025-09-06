import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log : ["query"]
})

prisma.user

export default prisma