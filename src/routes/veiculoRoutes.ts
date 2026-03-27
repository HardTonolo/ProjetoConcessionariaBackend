import { Router } from "express";
import { VeiculoController } from "../controllers/VeiculoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const veiculoController = new VeiculoController();

// Todas as rotas de veículo são autenticadas
router.use(authMiddleware);

router.get("/", veiculoController.listar);
router.get("/:id", veiculoController.buscarPorId);
router.post("/", veiculoController.criar);
router.put("/:id", veiculoController.atualizar);
router.delete("/:id", veiculoController.deletar);

export default router;