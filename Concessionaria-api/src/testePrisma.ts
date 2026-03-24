import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const usuarios = await prisma.usuarios.findMany();
    console.log("Conectado! Usuarios encontrados: ", usuarios);
}

main()
.catch(e => console.error(e))
.finally(async () => {
    await prisma.$disconnect();
});