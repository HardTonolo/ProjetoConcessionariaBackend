import { Router } from "express";
import { DepartamentoController } from "../controllers/DepartamentoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const departamentoController = new DepartamentoController();

router.use(authMiddleware);

router.get("/", departamentoController.listar);
router.get("/:id", departamentoController.buscarPorId);

export default router;