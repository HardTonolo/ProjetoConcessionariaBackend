import prisma from "../prisma/prismaClient";

export class UsuarioRepository {
  async findAll() {
    return prisma.usuarios.findMany({
      where: { deletado_em: null },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        permissao: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true,
      } as any,
    });
  }

  async findAllPaginated(skip: number, limit: number) {
    return prisma.usuarios.findMany({
      where: { deletado_em: null },
      skip,
      take: limit,
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        permissao: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true,
      } as any,
      orderBy: { criado_em: "desc" },
    });
  }

  async countAll() {
    return prisma.usuarios.count({
      where: { deletado_em: null },
    });
  }

  async findById(id: number) {
    return prisma.usuarios.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        senha: true,
        permissao: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true,
      } as any,
    });
  }

  async findByEmail(email: string) {
    return prisma.usuarios.findUnique({ where: { email } });
  }

  async findByCpf(cpf: string) {
    return prisma.usuarios.findFirst({ where: { cpf } as any });
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