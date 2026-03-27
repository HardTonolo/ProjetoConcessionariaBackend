import prisma from "../prisma/prismaClient";

export class OrcamentoRepository {
  async findAll() {
    return prisma.orcamentos.findMany({
      where: { deletado_em: null },
      include: {
        usuarios: { select: { id: true, nome: true, email: true } },
        clientes: { select: { id: true, nome: true, cpf: true } },
        veiculos: { select: { id: true, placa: true, modelo: true } },
      },
    });
  }

  // NOVO: método com paginação
  async findAllPaginated(skip: number, limit: number) {
    return prisma.orcamentos.findMany({
      where: { deletado_em: null },
      skip,
      take: limit,
      include: {
        usuarios: { select: { id: true, nome: true, email: true } },
        clientes: { select: { id: true, nome: true, cpf: true } },
        veiculos: { select: { id: true, placa: true, modelo: true } },
      },
      orderBy: { criado_em: "desc" },
    });
  }

  // NOVO: contar total
  async countAll() {
    return prisma.orcamentos.count({
      where: { deletado_em: null },
    });
  }

  async findById(id: number) {
    return prisma.orcamentos.findUnique({
      where: { id },
      include: {
        usuarios: { select: { id: true, nome: true, email: true } },
        clientes: { select: { id: true, nome: true, cpf: true } },
        veiculos: { select: { id: true, placa: true, modelo: true } },
      },
    });
  }

  async create(data: any) {
    return prisma.orcamentos.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.orcamentos.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number) {
    return prisma.orcamentos.update({
      where: { id },
      data: { deletado_em: new Date() },
    });
  }
}