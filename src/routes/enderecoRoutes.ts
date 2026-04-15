import { Router } from "express";
import { EnderecoController } from "../controllers/EnderecoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const enderecoController = new EnderecoController();

router.use(authMiddleware);

router.get("/", enderecoController.listar);
router.get("/cliente/:clienteId", enderecoController.listarPorCliente);
router.get("/:id", enderecoController.buscarPorId);
router.post("/", enderecoController.criar);
router.put("/:id", enderecoController.atualizar);
router.delete("/:id", enderecoController.deletar);

export default router;