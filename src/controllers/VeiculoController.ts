import { Request, Response } from "express";
import { VeiculoService } from "../services/VeiculoService";

const veiculoService = new VeiculoService();

export class VeiculoController {
  async listar(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;
      
      const resultado = await veiculoService.listarComPaginacao(page, limit);
      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const veiculo = await veiculoService.buscarPorId(id);
      res.json({ data: veiculo });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const veiculo = await veiculoService.criar(req.body);
      res.status(201).json({ data: veiculo, message: "Veículo criado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const veiculo = await veiculoService.atualizar(id, req.body);
      res.json({ data: veiculo, message: "Veículo atualizado com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const resultado = await veiculoService.deletar(id);
      res.json(resultado);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}