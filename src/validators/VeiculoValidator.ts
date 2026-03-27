export class VeiculoValidator {
  static validateCreate(data: { placa: string; modelo: string }) {
    if (!data.placa) {
      throw new Error("Placa é obrigatória");
    }

    if (!data.modelo) {
      throw new Error("Modelo é obrigatório");
    }

    // Validação básica de placa (formato antigo e Mercosul)
    const placaRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
    if (!placaRegex.test(data.placa.toUpperCase())) {
      throw new Error("Placa inválida. Formato: ABC1D23 ou ABC1234");
    }

    return true;
  }

  static validateUpdate(data: { placa?: string; modelo?: string }) {
    if (data.placa) {
      const placaRegex = /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/;
      if (!placaRegex.test(data.placa.toUpperCase())) {
        throw new Error("Placa inválida. Formato: ABC1D23 ou ABC1234");
      }
    }

    return true;
  }
}