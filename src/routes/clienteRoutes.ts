import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const clienteController = new ClienteController();

// Todas as rotas de cliente são autenticadas
router.use(authMiddleware);

router.get("/", clienteController.listar);
router.get("/:id", clienteController.buscarPorId);
router.post("/", clienteController.criar);
router.put("/:id", clienteController.atualizar);
router.delete("/:id", clienteController.deletar);

export default router;