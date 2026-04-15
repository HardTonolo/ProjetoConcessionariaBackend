import request from "supertest";
import app from "../app";

let token: string;
let usuarioEmail: string;
let usuarioId: number;

describe("CRUD Usuários", () => {
  beforeAll(async () => {
    // Criar email único para teste
    usuarioEmail = `teste${Date.now()}@email.com`;
    
    // Criar usuário via API com CPF válido
    const criarRes = await request(app)
      .post("/usuarios")
      .send({
        nome: "Usuario Teste",
        email: usuarioEmail,
        senha: "Teste@123",
        cpf: "52998224725", // CPF válido
      });

    // Fazer login
    const login = await request(app).post("/auth/login").send({
      email: usuarioEmail,
      senha: "Teste@123",
    });
    
    token = login.body.token;
    usuarioId = login.body.usuario.id;
  });

  test("criar usuário com email inválido retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: "invalido",
        senha: "Senha@123",
        cpf: "52998224725",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email inválido");
  });

  test("criar usuário com senha fraca retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: `teste${Date.now()}@email.com`,
        senha: "senha123",
        cpf: "52998224725",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain("senha deve ter no mínimo");
  });

  test("criar usuário sem nome retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        email: `teste${Date.now()}@email.com`,
        senha: "Senha@123",
        cpf: "52998224725",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Nome, email, senha e CPF são obrigatórios");
  });

  test("listar usuários com token válido", async () => {
    const res = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  test("listar usuários sem token retorna 401", async () => {
    const res = await request(app).get("/usuarios");
    expect(res.status).toBe(401);
  });

  test("tentar alterar email retorna erro", async () => {
    const res = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "novo@email.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Não é permitido alterar o email");
  });
});