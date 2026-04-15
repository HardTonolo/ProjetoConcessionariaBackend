import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EnderecoValidator } from "../validators/EnderecoValidator";
import { ICreateEnderecoDTO, IUpdateEnderecoDTO } from "../types/endereco";
import { getPaginationParams, formatPaginatedResponse } from "../utils/pagination";

export class EnderecoService {
  private repository: EnderecoRepository;

  constructor() {
    this.repository = new EnderecoRepository();
  }

  async listarComPaginacao(page?: number, limit?: number) {
    const { page: pageNum, limit: limitNum, skip } = getPaginationParams({ page, limit });
    
    const [enderecos, total] = await Promise.all([
      this.repository.findAllPaginated(skip, limitNum),
      this.repository.countAll(),
    ]);

    return formatPaginatedResponse(enderecos, total, pageNum, limitNum);
  }

  async listarPorCliente(clienteId: number) {
    return this.repository.findByClienteId(clienteId);
  }

  async buscarPorId(id: number) {
    const endereco = await this.repository.findById(id);
    if (!endereco) throw new Error("Endereço não encontrado");
    return endereco;
  }

  async criar(data: ICreateEnderecoDTO) {
    EnderecoValidator.validateCreate(data);
    
    const cepLimpo = data.cep ? data.cep.replace(/\D/g, "") : null;
    
    return this.repository.create({
      id_cliente: data.id_cliente,
      cep: cepLimpo,
      logradouro: data.logradouro || null,
      bairro: data.bairro || null,
      uf: data.uf || null,
      numero: data.numero || null,
      cidade: data.cidade || null,
    });
  }

  async atualizar(id: number, data: IUpdateEnderecoDTO) {
    await this.buscarPorId(id);
    EnderecoValidator.validateUpdate(data);
    
    const cepLimpo = data.cep ? data.cep.replace(/\D/g, "") : undefined;
    
    return this.repository.update(id, {
      cep: cepLimpo,
      logradouro: data.logradouro,
      bairro: data.bairro,
      uf: data.uf,
      numero: data.numero,
      cidade: data.cidade,
      atualizado_em: new Date(),
    });
  }

  async deletar(id: number) {
    await this.buscarPorId(id);
    await this.repository.softDelete(id);
    return { message: "Endereço deletado com sucesso" };
  }
}