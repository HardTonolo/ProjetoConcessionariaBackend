import { Request, Response } from "express";
import { EnderecoService } from "../services/EnderecoService";

const enderecoService = new EnderecoService();

export class EnderecoController {
  async listar(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      
      const resultado = await enderecoService.listarComPaginacao(page, limit);
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarPorCliente(req: Request, res: Response) {
    try {
      const clienteId = Number(req.params.clienteId);
      const enderecos = await enderecoService.listarPorCliente(clienteId);
      res.json({ data: enderecos });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const endereco = await enderecoService.buscarPorId(id);
      res.json({ data: endereco });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const endereco = await enderecoService.criar(req.body);
      res.status(201).json({ data: endereco, message: "Endereço criado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const endereco = await enderecoService.atualizar(id, req.body);
      res.json({ data: endereco, message: "Endereço atualizado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const resultado = await enderecoService.deletar(id);
      res.json(resultado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}