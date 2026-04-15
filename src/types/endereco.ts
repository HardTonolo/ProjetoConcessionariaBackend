export interface IEndereco {
  id: number;
  id_cliente: number | null;
  cep: string | null;
  logradouro: string | null;
  bairro: string | null;
  uf: string | null;
  numero: string | null;
  cidade: string | null;
  criado_em: Date;
  atualizado_em: Date;
  deletado_em: Date | null;
}

export interface ICreateEnderecoDTO {
  id_cliente: number;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  uf?: string;
  numero?: string;
  cidade?: string;
}

export interface IUpdateEnderecoDTO {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  uf?: string;
  numero?: string;
  cidade?: string;
}