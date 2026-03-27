export interface IOrcamento {
  id: number;
  etapa: string | null;
  valor_inicial: string | null;
  valor_final: string | null;
  data_inicio: Date | null;
  data_termino: Date | null;
  descricao: string | null;
  id_usuario: number | null;
  id_cliente: number | null;
  id_veiculo: number | null;
  criado_em: Date;
  atualizado_em: Date;
  deletado_em: Date | null;
}

export interface ICreateOrcamentoDTO {
  etapa?: string;
  valor_inicial?: string;
  valor_final?: string;
  data_inicio?: Date;
  data_termino?: Date;
  descricao?: string;
  id_usuario?: number;
  id_cliente?: number;
  id_veiculo?: number;
}

export interface IUpdateOrcamentoDTO {
  etapa?: string;
  valor_inicial?: string;
  valor_final?: string;
  data_inicio?: Date;
  data_termino?: Date;
  descricao?: string;
  id_usuario?: number;
  id_cliente?: number;
  id_veiculo?: number;
}