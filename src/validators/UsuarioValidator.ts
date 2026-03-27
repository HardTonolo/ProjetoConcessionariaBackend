import { validarEmail, validarNivelSenha } from "../utils/validators";

export class UsuarioValidator {
  static validateCreate(data: { nome: string; email: string; senha: string }) {
    if (!data.nome || !data.email || !data.senha) {
      throw new Error("Nome, email e senha são obrigatórios");
    }

    if (!validarEmail(data.email)) {
      throw new Error("Email inválido");
    }

    if (!validarNivelSenha(data.senha)) {
      throw new Error("A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)");
    }

    return true;
  }

  static validateUpdate(data: { nome?: string; senha?: string; email?: string }) {
    if (data.email) {
      throw new Error("Não é permitido alterar o email");
    }

    if (data.senha && !validarNivelSenha(data.senha)) {
      throw new Error("A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)");
    }

    return true;
  }
}