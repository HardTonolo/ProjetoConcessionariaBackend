import { Request, Response } from "express";
import {
  getUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
} from "../services/usuariosService";

// Extende o tipo Request
interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
    permissao: string;
  };
}

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await getUsuarios();
    res.json({
      data: usuarios,
      message: "Usuários listados com sucesso",
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const criarNovoUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await criarUsuario(req.body);
    res.status(201).json({
      data: usuario,
      message: "Usuário criado com sucesso",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const atualizarUsuarioController = async (req: CustomRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const usuarioLogadoId = req.user?.id;

    if (!usuarioLogadoId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const usuario = await atualizarUsuario(id, req.body);
    res.json({
      data: usuario,
      message: "Usuário atualizado com sucesso",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deletarUsuarioController = async (req: CustomRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const resultado = await deletarUsuario(id);
    res.json(resultado);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};