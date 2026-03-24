import { Router } from "express";
import {
  listarUsuarios,
  criarNovoUsuario,
  atualizarUsuarioController,
  deletarUsuarioController,
} from "../controllers/usuariosController";
import { authMiddleware, verificarProprietario } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", criarNovoUsuario);
router.get("/", authMiddleware, listarUsuarios);
router.put("/:id", authMiddleware, verificarProprietario, atualizarUsuarioController);
router.delete("/:id", authMiddleware, deletarUsuarioController);

export default router;