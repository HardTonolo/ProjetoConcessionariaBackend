import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { authMiddleware, verificarProprietario } from "../middlewares/authMiddleware";

const router = Router();
const usuarioController = new UsuarioController();

// Rotas públicas
router.post("/", usuarioController.criar);

// Rotas protegidas
router.get("/", authMiddleware, usuarioController.listar);
router.put("/:id", authMiddleware, verificarProprietario, usuarioController.atualizar);
router.delete("/:id", authMiddleware, verificarProprietario, usuarioController.deletar);
router.put("/:id/senha", authMiddleware, verificarProprietario, usuarioController.alterarSenha);

export default router;