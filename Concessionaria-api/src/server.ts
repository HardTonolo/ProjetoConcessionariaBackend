import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    return response.status(200).json({
        message: "API da Concessionaria Funcionando"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});