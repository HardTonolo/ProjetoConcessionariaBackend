import request from "supertest";
import app from "../app";

let token: string;
let userId: number;

describe("CRUD Usuários", () => {
  beforeAll(async () => {
    const login = await request(app).post("/auth/login").send({
      email: "joao@teste.com",
      senha: "Senha@123",
    });
    token = login.body.token;
    userId = login.body.usuario.id;
  });

  test("criar usuário com email inválido retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: "invalido",
        senha: "Senha@123",
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
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain("senha deve ter no mínimo");
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
      .put(`/usuarios/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "novo@email.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Não é permitido alterar o email");
  });

  // NOVO TESTE 3
  test("criar usuário sem nome retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        email: "teste@email.com",
        senha: "Senha@123",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Nome, email e senha são obrigatórios");
  });
});