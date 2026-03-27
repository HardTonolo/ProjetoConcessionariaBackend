export interface IVeiculo {
  id: number;
  placa: string;
  modelo: string;
  id_cliente: number | null;
  id_usuario: number | null;
  id_departamento: number | null;
  criado_em: Date;
  atualizado_em: Date;
  deletado_em: Date | null;
}

export interface ICreateVeiculoDTO {
  placa: string;
  modelo: string;
  id_cliente?: number;
  id_usuario?: number;
  id_departamento?: number;
}

export interface IUpdateVeiculoDTO {
  placa?: string;
  modelo?: string;
  id_cliente?: number;
  id_usuario?: number;
  id_departamento?: number;
}