import prisma from "../prisma/prismaClient";

export class OrcamentoRepository {
  async findAll() {
    return prisma.orcamentos.findMany({
      where: { deletado_em: null },
      include: {
        usuarios: { select: { id: true, nome: true, email: true } },
        clientes: { select: { id: true, nome: true, cpf: true, telefone: true } },
        veiculos: { select: { id: true, placa: true, modelo: true } },
      },
      orderBy: { criado_em: "desc" },
    });
  }

  async findAllPaginated(skip: number, limit: number, etapa?: string) {
    const where: any = { deletado_em: null };
    
    // 👈 FILTRO POR ETAPA
    if (etapa && etapa !== 'todas') {
      where.etapa = etapa;
    }
    
    const orcamentos = await prisma.orcamentos.findMany({
      where,
      skip,
      take: limit,
      include: {
        usuarios: { select: { id: true, nome: true, email: true } },
        clientes: { select: { id: true, nome: true, cpf: true, telefone: true } },
        veiculos: { select: { id: true, placa: true, modelo: true } },
      },
      orderBy: { criado_em: "desc" },
    });

    // Buscar departamentos separadamente
    const orcamentosComDepartamentos = await Promise.all(
      orcamentos.map(async (orcamento) => {
        if (orcamento.id_departamento) {
          const departamento = await prisma.departamentos.findUnique({
            where: { id: orcamento.id_departamento },
            select: { id: true, nome: true },
          });
          return { ...orcamento, departamentos: departamento };
        }
        return { ...orcamento, departamentos: null };
      })
    );

    return orcamentosComDepartamentos;
  }

  async countAll(etapa?: string) {
    const where: any = { deletado_em: null };
    
    // 👈 FILTRO POR ETAPA NO COUNT
    if (etapa && etapa !== 'todas') {
      where.etapa = etapa;
    }
    
    return prisma.orcamentos.count({ where });
  }

  async findById(id: number) {
    const orcamento = await prisma.orcamentos.findUnique({
      where: { id },
      include: {
        usuarios: { select: { id: true, nome: true, email: true } },
        clientes: { select: { id: true, nome: true, cpf: true, telefone: true } },
        veiculos: { select: { id: true, placa: true, modelo: true } },
      },
    });

    if (orcamento && orcamento.id_departamento) {
      const departamento = await prisma.departamentos.findUnique({
        where: { id: orcamento.id_departamento },
        select: { id: true, nome: true },
      });
      return { ...orcamento, departamentos: departamento };
    }

    return { ...orcamento, departamentos: null };
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