import { validarCPF } from "../utils/validators";

export class ClienteValidator {
  static validateCreate(data: { nome: string; cpf?: string }) {
    if (!data.nome) {
      throw new Error("Nome é obrigatório");
    }

    if (data.cpf && !validarCPF(data.cpf)) {
      throw new Error("CPF inválido");
    }

    return true;
  }

  static validateUpdate(data: { nome?: string; cpf?: string }) {
    if (data.cpf && !validarCPF(data.cpf)) {
      throw new Error("CPF inválido");
    }

    return true;
  }
}