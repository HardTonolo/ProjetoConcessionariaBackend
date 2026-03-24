import { Request, Response } from "express";
import { login } from "../services/authService";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const resultado = await login(email, senha);

    res.json(resultado);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};