export class OrcamentoValidator {
  static validateCreate(data: { 
    id_cliente?: number; 
    id_veiculo?: number; 
    valor_inicial?: string;
  }) {
    if (!data.id_cliente) {
      throw new Error("Cliente é obrigatório");
    }

    if (!data.id_veiculo) {
      throw new Error("Veículo é obrigatório");
    }

    if (data.valor_inicial && isNaN(Number(data.valor_inicial))) {
      throw new Error("Valor inicial deve ser um número");
    }

    return true;
  }

  static validateUpdate(data: { 
    valor_inicial?: string; 
    valor_final?: string;
  }) {
    if (data.valor_inicial && isNaN(Number(data.valor_inicial))) {
      throw new Error("Valor inicial deve ser um número");
    }

    if (data.valor_final && isNaN(Number(data.valor_final))) {
      throw new Error("Valor final deve ser um número");
    }

    return true;
  }
}