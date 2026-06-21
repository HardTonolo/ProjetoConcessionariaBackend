import { test, expect } from '@playwright/test';

let token: string;

// Função para gerar CPF válido (garantido)
function gerarCpfValido() {
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
  return [...base, digito1, digito2].join('');
}

test.beforeAll(async ({ request }) => {
  const login = await request.post('/api/auth/login', {
    data: {
      email: 'admin2@teste.com',
      senha: 'Admin@123',
    },
  });
  const body = await login.json();
  token = body.token;
});

test('CRUD Cliente - sucesso', async ({ request }) => {
  const cpf = gerarCpfValido();
  console.log('CPF gerado para cliente:', cpf);

  const create = await request.post('/api/clientes', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      nome: 'Cliente Teste',
      telefone: '(11) 99999-9999',
      cpf: cpf,
    },
  });

  console.log('Status create:', create.status());
  console.log('Body create:', await create.json());

  expect(create.status()).toBe(201);
  const cliente = await create.json();
  const clienteId = cliente.data.id;

  const list = await request.get('/api/clientes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(list.status()).toBe(200);

  const update = await request.put(`/api/clientes/${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { nome: 'Cliente Atualizado' },
  });
  expect(update.status()).toBe(200);
  expect((await update.json()).data.nome).toBe('Cliente Atualizado');

  const del = await request.delete(`/api/clientes/${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(del.status()).toBe(200);
});

test('CRUD Cliente - falha (CPF inválido)', async ({ request }) => {
  const create = await request.post('/api/clientes', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      nome: 'Cliente Teste',
      telefone: '(11) 99999-9999',
      cpf: '11111111111',
    },
  });
  expect(create.status()).toBe(400);
  const body = await create.json();
  expect(body.error).toBe('CPF inválido');
});