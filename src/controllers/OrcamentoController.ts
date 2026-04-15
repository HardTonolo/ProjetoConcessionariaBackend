import { Request, Response } from "express";
import { OrcamentoService } from "../services/OrcamentoService";

interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
    permissao: string;
  };
}

const orcamentoService = new OrcamentoService();

export class OrcamentoController {
  async listar(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      const etapa = req.query.etapa as string; // 👈 PEGAR O PARÂMETRO
      
      const resultado = await orcamentoService.listarComPaginacao(page, limit, etapa);
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const orcamento = await orcamentoService.buscarPorId(id);
      res.json({ data: orcamento });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async criar(req: CustomRequest, res: Response) {
    try {
      const usuarioId = req.user?.id;
      if (!usuarioId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const orcamento = await orcamentoService.criar(req.body, usuarioId);
      res.status(201).json({ data: orcamento, message: "Orçamento criado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const orcamento = await orcamentoService.atualizar(id, req.body);
      res.json({ data: orcamento, message: "Orçamento atualizado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const resultado = await orcamentoService.deletar(id);
      res.json(resultado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}