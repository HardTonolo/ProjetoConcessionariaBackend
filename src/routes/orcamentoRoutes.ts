import { Router } from "express";
import { OrcamentoController } from "../controllers/OrcamentoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const orcamentoController = new OrcamentoController();

// Todas as rotas de orçamento são autenticadas
router.use(authMiddleware);

router.get("/", orcamentoController.listar);
router.get("/:id", orcamentoController.buscarPorId);
router.post("/", orcamentoController.criar);
router.put("/:id", orcamentoController.atualizar);
router.delete("/:id", orcamentoController.deletar);

export default router;