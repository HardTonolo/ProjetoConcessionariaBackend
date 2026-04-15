import { Request, Response } from "express";
import { DepartamentoService } from "../services/DepartamentoService";

const departamentoService = new DepartamentoService();

export class DepartamentoController {
  async listar(req: Request, res: Response) {
    try {
      const departamentos = await departamentoService.listarTodos();
      res.json({ data: departamentos });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const departamento = await departamentoService.buscarPorId(id);
      res.json({ data: departamento });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}