export interface ICliente {
  id: number;
  nome: string;
  telefone: string | null;
  cpf: string | null;
  cnh: string | null;
  criado_em: Date;
  atualizado_em: Date;
  deletado_em: Date | null;
}

export interface ICreateClienteDTO {
  nome: string;
  telefone?: string;
  cpf?: string;
  cnh?: string;
}

export interface IUpdateClienteDTO {
  nome?: string;
  telefone?: string;
  cpf?: string;
  cnh?: string;
}