import { validarEmail, validarCPF, validarNivelSenha } from "../utils/validators";

describe("Validadores", () => {
  test("email válido", () => {
    expect(validarEmail("teste@email.com")).toBe(true);
    expect(validarEmail("teste@")).toBe(false);
  });

  test("CPF válido", () => {
    expect(validarCPF("52998224725")).toBe(true);
    expect(validarCPF("11111111111")).toBe(false);
  });

  test("senha forte", () => {
    expect(validarNivelSenha("Senha@123")).toBe(true);
    expect(validarNivelSenha("senha123")).toBe(false);
  });
});