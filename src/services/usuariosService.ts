import prisma from "../prisma/prismaClient";
import bcrypt from "bcryptjs";
import { validarEmail, validarNivelSenha } from "../utils/validators";

interface UsuarioData {
  nome: string;
  email: string;
  senha: string;
  permissao?: string;
  ativo?: boolean;
}

interface UsuarioUpdateData {
  nome?: string;
  senha?: string;
  permissao?: string;
  ativo?: boolean;
  email?: string;
}

export const getUsuarios = async () => {
  return await prisma.usuarios.findMany({
    where: { deletado_em: null },
    select: {
      id: true,
      nome: true,
      email: true,
      permissao: true,
      ativo: true,
      criado_em: true,
      atualizado_em: true,
    },
  });
};

export const criarUsuario = async (data: UsuarioData) => {
  const { nome, email, senha, permissao, ativo } = data;

  if (!nome || !email || !senha) {
    throw new Error("Nome, email e senha são obrigatórios");
  }

  if (!validarEmail(email)) {
    throw new Error("Email inválido");
  }

  if (!validarNivelSenha(senha)) {
    throw new Error("A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)");
  }

  const usuarioExistente = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new Error("Email já cadastrado");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuarios.create({
    data: {
      nome,
      email,
      senha: senhaHash,
      permissao: permissao || "user",
      ativo: ativo ?? true,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      permissao: true,
      ativo: true,
      criado_em: true,
    },
  });

  return usuario;
};

export const atualizarUsuario = async (id: number, data: UsuarioUpdateData) => {
  const usuarioExistente = await prisma.usuarios.findUnique({
    where: { id },
  });

  if (!usuarioExistente) {
    throw new Error("Usuário não encontrado");
  }

  if (data.email) {
    throw new Error("Não é permitido alterar o email");
  }

  let senhaHash;
  if (data.senha) {
    if (!validarNivelSenha(data.senha)) {
      throw new Error("A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)");
    }
    senhaHash = await bcrypt.hash(data.senha, 10);
  }

  const usuarioAtualizado = await prisma.usuarios.update({
    where: { id },
    data: {
      nome: data.nome,
      senha: senhaHash,
      permissao: data.permissao,
      ativo: data.ativo,
      atualizado_em: new Date(),
    },
    select: {
      id: true,
      nome: true,
      email: true,
      permissao: true,
      ativo: true,
      atualizado_em: true,
    },
  });

  return usuarioAtualizado;
};

export const deletarUsuario = async (id: number) => {
  const usuarioExistente = await prisma.usuarios.findUnique({
    where: { id },
  });

  if (!usuarioExistente) {
    throw new Error("Usuário não encontrado");
  }

  await prisma.usuarios.update({
    where: { id },
    data: {
      deletado_em: new Date(),
      ativo: false,
    },
  });

  return { message: "Usuário deletado com sucesso" };
};