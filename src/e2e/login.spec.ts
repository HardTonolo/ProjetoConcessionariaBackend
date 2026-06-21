import { test, expect } from '@playwright/test';

test('login com sucesso', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: {
      email: 'admin2@teste.com',
      senha: 'Admin@123',
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('token');
});

test('login com falha (senha errada)', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: {
      email: 'admin2@teste.com',
      senha: 'senhaerrada',
    },
  });
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toBe('Email ou senha inválidos');
});