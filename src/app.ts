import express from "express";
import usuariosRoutes from "./routes/usuariosRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/usuarios", usuariosRoutes);

app.use("/auth", authRoutes);

export default app;