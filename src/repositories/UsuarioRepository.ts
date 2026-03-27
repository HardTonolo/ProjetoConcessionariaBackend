import prisma from "../prisma/prismaClient";

export class UsuarioRepository {
  // Método existente (sem paginação) - pode manter
  async findAll() {
    return prisma.usuarios.findMany({
      where: { deletado_em: null },
      select: {
        id: true,
        nome: true,
        email: true,
        permissao: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true,
      },
    });
  }

  // NOVO: método com paginação
  async findAllPaginated(skip: number, limit: number) {
    return prisma.usuarios.findMany({
      where: { deletado_em: null },
      skip,
      take: limit,
      select: {
        id: true,
        nome: true,
        email: true,
        permissao: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true,
      },
      orderBy: { criado_em: "desc" },
    });
  }

  // NOVO: contar total de registros
  async countAll() {
    return prisma.usuarios.count({
      where: { deletado_em: null },
    });
  }

  // ... resto dos métodos existentes (findById, findByEmail, etc)
  async findById(id: number) {
    return prisma.usuarios.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return prisma.usuarios.findUnique({ where: { email } });
  }

  async create(data: any) {
    return prisma.usuarios.create({ data });
  }

  async update(id: number, data: any) {
    return prisma.usuarios.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number) {
    return prisma.usuarios.update({
      where: { id },
      data: {
        deletado_em: new Date(),
        ativo: false,
      },
    });
  }
}