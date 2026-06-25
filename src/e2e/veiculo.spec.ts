import { test, expect } from '@playwright/test';

let token: string;
let clienteId: number;


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

function gerarPlacaValida() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  let placa = '';
  for (let i = 0; i < 3; i++) {
    placa += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  placa += numeros.charAt(Math.floor(Math.random() * numeros.length));
  placa += letras.charAt(Math.floor(Math.random() * letras.length));
  placa += numeros.charAt(Math.floor(Math.random() * numeros.length));
  placa += numeros.charAt(Math.floor(Math.random() * numeros.length));
  return placa;
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

  const createCliente = await request.post('/api/clientes', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      nome: 'Cliente Teste Veiculo',
      telefone: '(11) 99999-9999',
      cpf: gerarCpfValido(),
    },
  });
  const cliente = await createCliente.json();
  clienteId = cliente.data.id;
});

test('CRUD Veículo - sucesso', async ({ request }) => {
  const placa = gerarPlacaValida();
  console.log('Placa gerada:', placa);

  const create = await request.post('/api/veiculos', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      placa: placa,
      modelo: 'Civic',
      id_cliente: clienteId,
    },
  });

  console.log('Status create:', create.status());
  console.log('Body create:', await create.json());

  expect(create.status()).toBe(201);
  const veiculo = await create.json();
  const veiculoId = veiculo.data.id;

  const list = await request.get('/api/veiculos', {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(list.status()).toBe(200);

  const update = await request.put(`/api/veiculos/${veiculoId}`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { modelo: 'Civic Touring' },
  });
  expect(update.status()).toBe(200);
  expect((await update.json()).data.modelo).toBe('Civic Touring');

  const del = await request.delete(`/api/veiculos/${veiculoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(del.status()).toBe(200);
});

test('CRUD Veículo - falha (placa inválida)', async ({ request }) => {
  const create = await request.post('/api/veiculos', {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      placa: '123',
      modelo: 'Civic',
      id_cliente: clienteId,
    },
  });
  expect(create.status()).toBe(400);
  const body = await create.json();
  expect(body.error).toContain('Placa inválida');
});