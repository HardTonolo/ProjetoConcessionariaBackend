import prisma from "../prisma/prismaClient";

export class EnderecoRepository {
  async findAll() {
    return prisma.enderecos.findMany({
      where: { deletado_em: null },
      include: { clientes: true },
    });
  }

  async findAllPaginated(skip: number, limit: number) {
    return prisma.enderecos.findMany({
      where: { deletado_em: null },
      skip,
      take: limit,
      include: { clientes: true },
      orderBy: { criado_em: "desc" },
    });
  }

  async countAll() {
    return prisma.enderecos.count({
      where: { deletado_em: null },
    });
  }

  async findById(id: number) {
    return prisma.enderecos.findUnique({
      where: { id },
      include: { clientes: true },
    });
  }

  async findByClienteId(clienteId: number) {
    return prisma.enderecos.findMany({
      where: { id_cliente: clienteId, deletado_em: null },
    });
  }

  async create(data: any) {
    return prisma.enderecos.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.enderecos.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number) {
    return prisma.enderecos.update({
      where: { id },
      data: { deletado_em: new Date() },
    });
  }
}