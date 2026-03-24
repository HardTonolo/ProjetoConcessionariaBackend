export interface UsuarioData {
  nome: string;
  email: string;
  senha: string;
  cpf?: string;
  permissao?: string;
  ativo?: boolean;
}

export interface UsuarioUpdateData {
  nome?: string;
  senha?: string;
  cpf?: string;
  permissao?: string;
  ativo?: boolean;
  email?: string;
}