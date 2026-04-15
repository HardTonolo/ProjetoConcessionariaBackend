import prisma from "../prisma/prismaClient";

export class DepartamentoRepository {
  async findAll() {
    return prisma.departamentos.findMany({
      where: { deletado_em: null },
      select: {
        id: true,
        nome: true,
      },
      orderBy: { nome: "asc" },
    });
  }

  async findById(id: number) {
    return prisma.departamentos.findUnique({
      where: { id },
    });
  }
}