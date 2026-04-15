import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UsuarioValidator } from "../validators/UsuarioValidator";
import { UsuarioData, UsuarioUpdateData } from "../types/usuario";
import { getPaginationParams, formatPaginatedResponse } from "../utils/pagination";

export class UsuarioService {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async listarComPaginacao(page?: number, limit?: number) {
    const { page: pageNum, limit: limitNum, skip } = getPaginationParams({ page, limit });
    
    const [usuarios, total] = await Promise.all([
      this.repository.findAllPaginated(skip, limitNum),
      this.repository.countAll(),
    ]);

    return formatPaginatedResponse(usuarios, total, pageNum, limitNum);
  }

  async listarTodos() {
    return this.repository.findAll();
  }

  async buscarPorId(id: number) {
    const usuario = await this.repository.findById(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return usuario;
  }

  async criar(data: UsuarioData) {
    this.validarCriacao(data);
    await this.verificarEmailUnico(data.email);
    await this.verificarCpfUnico(data.cpf);
    const senhaHash = await this.gerarHashSenha(data.senha);
    const usuario = await this.repository.create(this.montarDadosCriacao(data, senhaHash));
    return this.removerSenha(usuario);
  }

  async atualizar(id: number, data: UsuarioUpdateData) {
    await this.buscarPorId(id);
    this.validarAtualizacao(data);
    await this.verificarCpfUnicoAtualizacao(data.cpf, id);
    const senhaHash = data.senha ? await this.gerarHashSenha(data.senha) : undefined;
    const usuario = await this.repository.update(id, this.montarDadosAtualizacao(data, senhaHash));
    return this.removerSenha(usuario);
  }

  async deletar(id: number) {
    await this.buscarPorId(id);
    await this.repository.softDelete(id);
    return { message: "Usuário deletado com sucesso" };
  }

  async alterarSenha(id: number, senhaAtual: string, novaSenha: string) {
  const usuario = await this.repository.findById(id) as any;
  
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }
  
  if (!usuario.senha) {
    throw new Error("Usuário não possui senha cadastrada");
  }
  
  const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
  if (!senhaValida) {
    throw new Error("Senha atual incorreta");
  }
  
  const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
  await this.repository.update(id, { senha: novaSenhaHash });
  
  return { message: "Senha alterada com sucesso" };
}

  // Métodos auxiliares
  private validarCriacao(data: UsuarioData) {
    UsuarioValidator.validateCreate(data);
  }

  private validarAtualizacao(data: UsuarioUpdateData) {
    UsuarioValidator.validateUpdate(data);
  }

  private async verificarEmailUnico(email: string) {
    const existe = await this.repository.findByEmail(email);
    if (existe) throw new Error("Email já cadastrado");
  }

  private async verificarCpfUnico(cpf: string) {
    const existe = await this.repository.findByCpf(cpf);
    if (existe) throw new Error("CPF já cadastrado");
  }

  private async verificarCpfUnicoAtualizacao(cpf?: string, id?: number) {
    if (!cpf) return;
    const existe = await this.repository.findByCpf(cpf);
    if (existe && existe.id !== id) throw new Error("CPF já cadastrado");
  }

  private async gerarHashSenha(senha: string) {
    return bcrypt.hash(senha, 10);
  }

  private montarDadosCriacao(data: UsuarioData, senhaHash: string) {
    return {
      nome: data.nome,
      email: data.email,
      senha: senhaHash,
      cpf: data.cpf,
      permissao: data.permissao || "user",
      ativo: data.ativo ?? true,
    };
  }

  private montarDadosAtualizacao(data: UsuarioUpdateData, senhaHash?: string) {
    return {
      nome: data.nome,
      senha: senhaHash,
      cpf: data.cpf,
      permissao: data.permissao,
      ativo: data.ativo,
      atualizado_em: new Date(),
    };
  }

  private removerSenha(usuario: any) {
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}