export class EnderecoValidator {
  static validateCreate(data: { id_cliente: number; cep?: string }) {
    if (!data.id_cliente) {
      throw new Error("Cliente é obrigatório");
    }

    if (data.cep && !this.validarCep(data.cep)) {
      throw new Error("CEP inválido. Formato: 12345-678 ou 12345678");
    }

    return true;
  }

  static validateUpdate(data: { cep?: string }) {
    if (data.cep && !this.validarCep(data.cep)) {
      throw new Error("CEP inválido. Formato: 12345-678 ou 12345678");
    }
    return true;
  }

  private static validarCep(cep: string): boolean {
    const cepLimpo = cep.replace(/\D/g, "");
    return cepLimpo.length === 8;
  }
}