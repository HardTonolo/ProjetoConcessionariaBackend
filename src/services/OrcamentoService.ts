import { OrcamentoRepository } from "../repositories/OrcamentoRepository";
import { OrcamentoValidator } from "../validators/OrcamentoValidator";
import { ICreateOrcamentoDTO, IUpdateOrcamentoDTO } from "../types/orcamento";
import { getPaginationParams, formatPaginatedResponse } from "../utils/pagination";

export class OrcamentoService {
  private repository: OrcamentoRepository;

  constructor() {
    this.repository = new OrcamentoRepository();
  }

  // NOVO: listar com paginação
  async listarComPaginacao(page?: number, limit?: number) {
    const { page: pageNum, limit: limitNum, skip } = getPaginationParams({ page, limit });
    
    const [orcamentos, total] = await Promise.all([
      this.repository.findAllPaginated(skip, limitNum),
      this.repository.countAll(),
    ]);

    return formatPaginatedResponse(orcamentos, total, pageNum, limitNum);
  }

  async listarTodos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: number) {
    const orcamento = await this.repository.findById(id);
    if (!orcamento) throw new Error("Orçamento não encontrado");
    return orcamento;
  }

  async criar(data: ICreateOrcamentoDTO, usuarioId: number) {
    OrcamentoValidator.validateCreate(data);
    return this.repository.create(this.montarDadosCriacao(data, usuarioId));
  }

  async atualizar(id: number, data: IUpdateOrcamentoDTO) {
    await this.buscarPorId(id);
    OrcamentoValidator.validateUpdate(data);
    return this.repository.update(id, this.montarDadosAtualizacao(data));
  }

  async deletar(id: number) {
    await this.buscarPorId(id);
    await this.repository.softDelete(id);
    return { message: "Orçamento deletado com sucesso" };
  }

  // Métodos auxiliares
  private montarDadosCriacao(data: ICreateOrcamentoDTO, usuarioId: number) {
    return {
      etapa: data.etapa || "orçamento",
      valor_inicial: data.valor_inicial || null,
      valor_final: data.valor_final || null,
      data_inicio: data.data_inicio || new Date(),
      data_termino: data.data_termino || null,
      descricao: data.descricao || null,
      id_usuario: usuarioId,
      id_cliente: data.id_cliente,
      id_veiculo: data.id_veiculo,
    };
  }

  private montarDadosAtualizacao(data: IUpdateOrcamentoDTO) {
    return {
      etapa: data.etapa,
      valor_inicial: data.valor_inicial,
      valor_final: data.valor_final,
      data_inicio: data.data_inicio,
      data_termino: data.data_termino,
      descricao: data.descricao,
      id_cliente: data.id_cliente,
      id_veiculo: data.id_veiculo,
      atualizado_em: new Date(),
    };
  }
}