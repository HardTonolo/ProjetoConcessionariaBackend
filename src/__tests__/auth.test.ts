import request from "supertest";
import app from "../app";

describe("Autenticação", () => {
  test("login com email inválido retorna erro", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "invalido",
      senha: "Senha@123",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email inválido");
  });

  test("login com senha errada retorna erro", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "joao@teste.com",
      senha: "SenhaErrada",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email ou senha inválidos");
  });

  // NOVO TESTE 1
  test("login com email vazio retorna erro", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "",
      senha: "Senha@123",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email inválido");
  });

  // NOVO TESTE 2
  test("login com senha vazia retorna erro", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "joao@teste.com",
      senha: "",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email ou senha inválidos");
  });
});