import prisma from "../prisma/prismaClient";

export class VeiculoRepository {
  async findAll() {
    return prisma.veiculos.findMany({
      where: { deletado_em: null },
      include: {
        clientes: true,
        usuarios: true,
        departamentos: true,
      },
    });
  }

  // NOVO: método com paginação
  async findAllPaginated(skip: number, limit: number) {
    return prisma.veiculos.findMany({
      where: { deletado_em: null },
      skip,
      take: limit,
      include: {
        clientes: true,
        usuarios: true,
        departamentos: true,
      },
      orderBy: { criado_em: "desc" },
    });
  }

  // NOVO: contar total
  async countAll() {
    return prisma.veiculos.count({
      where: { deletado_em: null },
    });
  }

  async findById(id: number) {
    return prisma.veiculos.findUnique({
      where: { id },
      include: {
        clientes: true,
        usuarios: true,
        departamentos: true,
      },
    });
  }

  async findByPlaca(placa: string) {
    return prisma.veiculos.findFirst({ where: { placa } });
  }

  async create(data: any) {
    return prisma.veiculos.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.veiculos.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number) {
    return prisma.veiculos.update({
      where: { id },
      data: { deletado_em: new Date() },
    });
  }
}