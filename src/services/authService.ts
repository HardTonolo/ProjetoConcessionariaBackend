import prisma from "../prisma/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validarEmail } from "../utils/validators";

export const login = async (email: string, senha: string) => {
  if (!validarEmail(email)) {
    throw new Error("Email inválido");
  }

  const usuario = await prisma.usuarios.findUnique({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
      cpf: true,
      senha: true,
      permissao: true,
      ativo: true,
      criado_em: true,
      atualizado_em: true,
    } as any,
  }) as any; // 👈 FORÇAR TIPO AQUI

  if (!usuario) {
    throw new Error("Email ou senha inválidos");
  }

  if (usuario.ativo === false) {
    throw new Error("Usuário desativado. Contate o administrador.");
  }

  if (!usuario.senha) {
    throw new Error("Usuário sem senha cadastrada");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Email ou senha inválidos");
  }

  const secret = process.env.JWT_SECRET || "segredo_super_secreto";
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      permissao: usuario.permissao,
    },
    secret,
    { expiresIn: "1d" }
  );

  const { senha: _, ...usuarioSemSenha } = usuario;

  return {
    usuario: usuarioSemSenha,
    token,
  };
};