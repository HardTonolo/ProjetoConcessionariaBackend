import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import veiculoRoutes from "./routes/veiculoRoutes";
import orcamentoRoutes from "./routes/orcamentoRoutes";
import enderecoRoutes from "./routes/enderecoRoutes";
import departamentoRoutes from "./routes/departamentoRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

// CORS - Permitir requisições do front-end
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rota de saúde da API
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Rotas da API
app.use("/usuarios", usuarioRoutes);
app.use("/clientes", clienteRoutes);
app.use("/veiculos", veiculoRoutes);
app.use("/orcamentos", orcamentoRoutes);
app.use("/enderecos", enderecoRoutes);
app.use("/departamentos", departamentoRoutes);
app.use("/auth", authRoutes);

export default app;