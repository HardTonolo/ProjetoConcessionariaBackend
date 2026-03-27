import { ClienteRepository } from "../repositories/ClienteRepository";
import { ClienteValidator } from "../validators/ClienteValidator";
import { ICreateClienteDTO, IUpdateClienteDTO } from "../types/cliente";
import { getPaginationParams, formatPaginatedResponse } from "../utils/pagination";

export class ClienteService {
  private repository: ClienteRepository;

  constructor() {
    this.repository = new ClienteRepository();
  }

  // NOVO: listar com paginação
  async listarComPaginacao(page?: number, limit?: number) {
    const { page: pageNum, limit: limitNum, skip } = getPaginationParams({ page, limit });
    
    const [clientes, total] = await Promise.all([
      this.repository.findAllPaginated(skip, limitNum),
      this.repository.countAll(),
    ]);

    return formatPaginatedResponse(clientes, total, pageNum, limitNum);
  }

  async listarTodos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: number) {
    const cliente = await this.repository.findById(id);
    if (!cliente) throw new Error("Cliente não encontrado");
    return cliente;
  }

  async criar(data: ICreateClienteDTO) {
    this.validarCriacao(data);
    await this.verificarCpfUnico(data.cpf);
    return this.repository.create(this.montarDadosCriacao(data));
  }

  async atualizar(id: number, data: IUpdateClienteDTO) {
    await this.buscarPorId(id);
    this.validarAtualizacao(data);
    await this.verificarCpfUnicoAtualizacao(data.cpf, id);
    return this.repository.update(id, this.montarDadosAtualizacao(data));
  }

  async deletar(id: number) {
    await this.buscarPorId(id);
    await this.repository.softDelete(id);
    return { message: "Cliente deletado com sucesso" };
  }

  // Métodos auxiliares
  private validarCriacao(data: ICreateClienteDTO) {
    ClienteValidator.validateCreate(data);
  }

  private validarAtualizacao(data: IUpdateClienteDTO) {
    ClienteValidator.validateUpdate(data);
  }

  private async verificarCpfUnico(cpf?: string) {
    if (!cpf) return;
    const existe = await this.repository.findByCpf(cpf);
    if (existe) throw new Error("CPF já cadastrado");
  }

  private async verificarCpfUnicoAtualizacao(cpf?: string, id?: number) {
    if (!cpf) return;
    const existe = await this.repository.findByCpf(cpf);
    if (existe && existe.id !== id) throw new Error("CPF já cadastrado");
  }

  private montarDadosCriacao(data: ICreateClienteDTO) {
    return {
      nome: data.nome,
      telefone: data.telefone || null,
      cpf: data.cpf || null,
      cnh: data.cnh || null,
    };
  }

  private montarDadosAtualizacao(data: IUpdateClienteDTO) {
    return {
      nome: data.nome,
      telefone: data.telefone,
      cpf: data.cpf,
      cnh: data.cnh,
      atualizado_em: new Date(),
    };
  }
}