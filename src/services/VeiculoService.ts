import { VeiculoRepository } from "../repositories/VeiculoRepository";
import { VeiculoValidator } from "../validators/VeiculoValidator";
import { ICreateVeiculoDTO, IUpdateVeiculoDTO } from "../types/veiculo";
import { getPaginationParams, formatPaginatedResponse } from "../utils/pagination";

export class VeiculoService {
  private repository: VeiculoRepository;

  constructor() {
    this.repository = new VeiculoRepository();
  }

  async listarComPaginacao(page?: number, limit?: number) {
    const { page: pageNum, limit: limitNum, skip } = getPaginationParams({ page, limit });
    
    const [veiculos, total] = await Promise.all([
      this.repository.findAllPaginated(skip, limitNum),
      this.repository.countAll(),
    ]);

    return formatPaginatedResponse(veiculos, total, pageNum, limitNum);
  }

  async listarTodos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: number) {
    const veiculo = await this.repository.findById(id);
    if (!veiculo) throw new Error("Veículo não encontrado");
    return veiculo;
  }

  async criar(data: ICreateVeiculoDTO, usuarioId: number) {
    this.validarCriacao(data);
    await this.verificarPlacaUnica(data.placa);
    return this.repository.create(this.montarDadosCriacao(data, usuarioId));
  }

  async atualizar(id: number, data: IUpdateVeiculoDTO) {
    await this.buscarPorId(id);
    this.validarAtualizacao(data);
    await this.verificarPlacaUnicaAtualizacao(data.placa, id);
    return this.repository.update(id, this.montarDadosAtualizacao(data));
  }

  async deletar(id: number) {
    await this.buscarPorId(id);
    await this.repository.softDelete(id);
    return { message: "Veículo deletado com sucesso" };
  }

  // Métodos auxiliares
  private validarCriacao(data: ICreateVeiculoDTO) {
    VeiculoValidator.validateCreate(data);
  }

  private validarAtualizacao(data: IUpdateVeiculoDTO) {
    VeiculoValidator.validateUpdate(data);
  }

  private async verificarPlacaUnica(placa: string) {
    const existe = await this.repository.findByPlaca(placa);
    if (existe) throw new Error("Placa já cadastrada");
  }

  private async verificarPlacaUnicaAtualizacao(placa?: string, id?: number) {
    if (!placa) return;
    const existe = await this.repository.findByPlaca(placa);
    if (existe && existe.id !== id) throw new Error("Placa já cadastrada");
  }

  private montarDadosCriacao(data: ICreateVeiculoDTO, usuarioId: number) {
    return {
      placa: data.placa.toUpperCase(),
      modelo: data.modelo,
      id_cliente: data.id_cliente || null,
      id_usuario: usuarioId,  // 👈 SALVA O USUÁRIO LOGADO
    };
  }

  private montarDadosAtualizacao(data: IUpdateVeiculoDTO) {
    return {
      placa: data.placa ? data.placa.toUpperCase() : undefined,
      modelo: data.modelo,
      id_cliente: data.id_cliente,
      id_usuario: data.id_usuario,
      atualizado_em: new Date(),
    };
  }
}