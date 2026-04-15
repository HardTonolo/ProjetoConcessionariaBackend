import { DepartamentoRepository } from "../repositories/DepartamentoRepository";

export class DepartamentoService {
  private repository: DepartamentoRepository;

  constructor() {
    this.repository = new DepartamentoRepository();
  }

  async listarTodos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: number) {
    const departamento = await this.repository.findById(id);
    if (!departamento) throw new Error("Departamento não encontrado");
    return departamento;
  }
}