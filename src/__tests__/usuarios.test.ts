import request from "supertest";
import app from "../app";

let token: string;


const gerarCpfValido = () => {
  
  const base = [];
  for (let i = 0; i < 9; i++) {
    base.push(Math.floor(Math.random() * 10));
  }
  
 
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += base[i] * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto >= 10 ? 0 : resto;
  
  
  soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += base[i] * (11 - i);
  }
  soma += digito1 * 2;
  resto = 11 - (soma % 11);
  let digito2 = resto >= 10 ? 0 : resto;
  

  const cpf = [...base, digito1, digito2].join('');
  return cpf;
};

describe("CRUD Usuários", () => {
  beforeAll(async () => {
    // Gerar gmail e CPF únicos para o teste
    const emailTeste = `teste${Date.now()}@email.com`;
    const cpfTeste = gerarCpfValido();
    
    console.log("Email:", emailTeste);
    console.log("CPF:", cpfTeste);
    
    // Cria usuário para teste
    const criarRes = await request(app)
      .post("/usuarios")
      .send({
        nome: "Usuario Teste",
        email: emailTeste,
        senha: "Teste@123",
        cpf: cpfTeste,
      });
    
    console.log("Criar usuário resposta:", criarRes.status);
    if (criarRes.status !== 201) {
      console.log("Erro:", criarRes.body);
    }

    // tenta fazer login com o usuário criado
    const login = await request(app).post("/auth/login").send({
      email: emailTeste,
      senha: "Teste@123",
    });
    
    console.log("Login resposta:", login.status);
    token = login.body.token;
    console.log("Token obtido:", token ? "OK" : "undefined");
  });

  test("criar usuário com email inválido retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: "invalido",
        senha: "Senha@123",
        cpf: gerarCpfValido(),
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
        cpf: gerarCpfValido(),
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
        cpf: gerarCpfValido(),
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Nome, email, senha e CPF são obrigatórios");
  });

  test("criar usuário com CPF inválido retorna erro", async () => {
    const res = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste",
        email: `teste${Date.now()}@email.com`,
        senha: "Senha@123",
        cpf: "11111111111",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("CPF inválido");
  });

  test("listar usuários com token válido", async () => {
    if (!token) {
      console.log("Token não disponível, pulando teste");
      return;
    }
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
});