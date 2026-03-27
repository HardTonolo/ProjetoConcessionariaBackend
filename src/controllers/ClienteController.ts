import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";

const clienteService = new ClienteService();

export class ClienteController {
  async listar(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      
      const resultado = await clienteService.listarComPaginacao(page, limit);
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const cliente = await clienteService.buscarPorId(id);
      res.json({ data: cliente });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const cliente = await clienteService.criar(req.body);
      res.status(201).json({ data: cliente, message: "Cliente criado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const cliente = await clienteService.atualizar(id, req.body);
      res.json({ data: cliente, message: "Cliente atualizado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const resultado = await clienteService.deletar(id);
      res.json(resultado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}