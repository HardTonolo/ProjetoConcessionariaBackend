-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/06/2026 às 15:22
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `concessionaria`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `cnh` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletado_em` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `telefone`, `cpf`, `cnh`, `criado_em`, `atualizado_em`, `deletado_em`) VALUES
(1, 'jonas', '(33) 44094-9400', '816.682.460-40', '34567765434', '2026-04-15 01:44:31', '2026-04-15 01:58:49', '2026-04-17 01:04:43'),
(2, 'juninho', '(44) 53263-6726', '221.032.870-53', '27367812534', '2026-04-16 03:17:50', '2026-04-16 03:17:50', NULL),
(3, 'Lincoln Tonolo', '(44) 99768-0222', '125.824.029-74', '22222222222', '2026-04-17 01:11:20', '2026-04-17 01:17:42', NULL);

--
-- Acionadores `clientes`
--
DELIMITER $$
CREATE TRIGGER `formatar_cpf_cliente_before_insert` BEFORE INSERT ON `clientes` FOR EACH ROW BEGIN
  IF NEW.cpf IS NOT NULL AND LENGTH(NEW.cpf) = 11 THEN
    SET NEW.cpf = CONCAT(
      SUBSTRING(NEW.cpf, 1, 3), '.',
      SUBSTRING(NEW.cpf, 4, 3), '.',
      SUBSTRING(NEW.cpf, 7, 3), '-',
      SUBSTRING(NEW.cpf, 10, 2)
    );
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `formatar_cpf_cliente_before_update` BEFORE UPDATE ON `clientes` FOR EACH ROW BEGIN
  IF NEW.cpf IS NOT NULL AND LENGTH(NEW.cpf) = 11 THEN
    SET NEW.cpf = CONCAT(
      SUBSTRING(NEW.cpf, 1, 3), '.',
      SUBSTRING(NEW.cpf, 4, 3), '.',
      SUBSTRING(NEW.cpf, 7, 3), '-',
      SUBSTRING(NEW.cpf, 10, 2)
    );
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `departamentos`
--

CREATE TABLE `departamentos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletado_em` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `departamentos`
--

INSERT INTO `departamentos` (`id`, `nome`, `criado_em`, `atualizado_em`, `deletado_em`) VALUES
(1, 'Funilaria', '2026-04-14 22:55:41', '2026-04-14 22:55:41', NULL),
(2, 'Pintura', '2026-04-14 22:55:41', '2026-04-14 22:55:41', NULL),
(3, 'Mecânica', '2026-04-14 22:55:41', '2026-04-14 22:55:41', NULL),
(4, 'Auto Santos', '2026-04-14 22:55:41', '2026-04-14 22:55:41', NULL),
(5, 'Maquinaria', '2026-04-14 22:55:41', '2026-04-14 22:55:41', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) DEFAULT NULL,
  `uf` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletado_em` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `orcamentos`
--

CREATE TABLE `orcamentos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_veiculo` int(11) DEFAULT NULL,
  `id_departamento` int(11) DEFAULT NULL,
  `etapa` varchar(255) DEFAULT NULL,
  `valor_inicial` varchar(255) DEFAULT NULL,
  `valor_final` varchar(255) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_termino` date DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletado_em` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `orcamentos`
--

INSERT INTO `orcamentos` (`id`, `id_usuario`, `id_cliente`, `id_veiculo`, `id_departamento`, `etapa`, `valor_inicial`, `valor_final`, `data_inicio`, `data_termino`, `descricao`, `criado_em`, `atualizado_em`, `deletado_em`) VALUES
(1, 1, 1, 1, 4, 'aguardando_retirada', NULL, NULL, '2026-04-14', '2026-04-30', 'refaezr motor', '2026-04-15 01:57:01', '2026-04-17 01:03:19', '2026-04-17 01:03:50'),
(2, 6, 2, 2, 2, 'em_andamento', NULL, NULL, '2026-04-16', '2026-04-23', 'Pintar de Rosa', '2026-04-16 03:20:16', '2026-04-17 01:03:27', NULL),
(3, 18, 3, 3, 3, 'em_andamento', NULL, NULL, '2026-04-16', '2026-04-17', 'Balanceamento de pneus', '2026-04-17 01:12:35', '2026-04-17 01:12:35', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `permissao` varchar(255) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletado_em` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `cpf`, `permissao`, `ativo`, `criado_em`, `atualizado_em`, `deletado_em`) VALUES
(1, 'lincoln', 'lincolntonolo@gmail.com', '$2b$10$FfE1VB4WI3Phbb25XWaCsebMESDodJOy/w5/brrxCLlYN9DUWsJFW', '166.653.269-00', 'user', 1, '2026-04-15 01:42:25', '2026-04-15 01:42:25', NULL),
(2, 'eduardo', 'edu@gmail.com', '$2b$10$QBR.tgWo9HWchLSZQVWZ/.KS2DYzglTEVAnoh1rPfDibzeSuo1lTm', '517.982.030-81', 'user', 1, '2026-04-15 02:00:24', '2026-04-15 02:00:24', NULL),
(3, 'Admin Teste', 'admin@teste.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrZ3qJqXqXqXqXqXqXqXqXqXqXqXq', '123.456.789-01', 'admin', 1, '2026-04-14 23:08:44', '2026-04-14 23:08:44', NULL),
(4, 'Usuario Teste', 'teste1776208331517@email.com', '$2b$10$wvAJJaOls6V1RKHly4h2tOnZCY6.m44ng6RmbhS4.5ZynzkwBKR5u', '529.982.247-25', 'user', 1, '2026-04-15 02:12:11', '2026-04-15 02:12:11', NULL),
(5, 'Burnes', 'burnes@gmail.com', '$2b$10$4gXhM8BlcCc1FI5G/3MHt.2eY17mnROQ.8SVkX75jjRK9lQ7tZXmK', '699.525.920-35', 'user', 1, '2026-04-16 02:47:05', '2026-04-16 02:47:05', NULL),
(6, 'Matheus', 'matheus@gmail.com', '$2b$10$zbLXzj7nKotYz6/SMDDhXO1NxLcESNJlwn9tfKJeZEV/5K5owuR5i', '302.911.490-22', 'user', 1, '2026-04-16 03:13:49', '2026-04-16 03:13:49', NULL),
(12, 'Usuario Teste', 'teste1776352140174@email.com', '$2b$10$5zrG7QDn2EPqFVqzEH3cBuUM.Kxu130EfPmlXVlYFY7RNJvmCztgC', '832.607.163-35', 'user', 1, '2026-04-16 18:09:00', '2026-04-16 18:09:00', NULL),
(13, 'Usuario Teste', 'teste1776352735417@email.com', '$2b$10$fQW2/2jbGTFTCI2.oNUjm.5ldIC/HUdzIb93/NLcfkp3MI.tz6gj2', '224.761.637-24', 'user', 1, '2026-04-16 18:18:55', '2026-04-16 18:18:55', NULL),
(14, 'Usuario Teste', 'teste1776352742393@email.com', '$2b$10$k3b5Us9GDzqr3T4u3DQODuiGN8zBeLqdZsOYN6a/aKQHoMpVVcXFm', '338.579.066-26', 'user', 1, '2026-04-16 18:19:02', '2026-04-16 18:19:02', NULL),
(15, 'Usuario Teste', 'teste1776353639935@email.com', '$2b$10$28IdTuGq61S9JQa82JBSH.FqXdSGbbiwaoy7jkbPxHFWrDcV5kCuW', '821.926.592-29', 'user', 1, '2026-04-16 18:34:00', '2026-04-16 18:34:00', NULL),
(16, 'Usuario Teste', 'teste1776353697316@email.com', '$2b$10$L5yTt00Sn4OgJu.IkuxC2OSAUcM0tTo1LBLJmSvbha7saAC588q5G', '439.131.997-72', 'user', 1, '2026-04-16 18:34:57', '2026-04-16 18:34:57', NULL),
(17, 'Usuario Teste', 'teste1776376875134@email.com', '$2b$10$qaT6AO83Ws4RLyMQgL4gV.C7fZnWAPVfFHoGgephMB4SCPQ.i3Hni', '005.631.744-12', 'user', 1, '2026-04-17 01:01:15', '2026-04-17 01:01:15', NULL),
(18, 'Eduardo novacki', 'eduardo@gmail.com', '$2b$10$GUqx8lTemD0n0DYuAdSCiOFk1icVEuLsOQIxbbYx5T0YYaWswojb.', '125.824.029-74', 'user', 1, '2026-04-17 01:09:29', '2026-04-17 01:09:29', NULL),
(19, 'Usuario Teste', 'teste1776378003951@email.com', '$2b$10$u0AJGyaJBhXSdfodMKpetugBcp660c9RUMMMyeD46jr0iMcQ4VjJK', '668.069.501-59', 'user', 1, '2026-04-17 01:20:04', '2026-04-17 01:20:04', NULL),
(20, 'Usuario Teste', 'teste1776378034179@email.com', '$2b$10$oTG1IYnNmzhGohR7H79xUOe2Qo1OMX/67cxn1trWfI6gE1sQoHX52', '675.127.982-53', 'user', 1, '2026-04-17 01:20:34', '2026-04-17 01:20:34', NULL);

--
-- Acionadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `formatar_cpf_before_insert` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
  IF NEW.cpf IS NOT NULL AND LENGTH(NEW.cpf) = 11 THEN
    SET NEW.cpf = CONCAT(
      SUBSTRING(NEW.cpf, 1, 3), '.',
      SUBSTRING(NEW.cpf, 4, 3), '.',
      SUBSTRING(NEW.cpf, 7, 3), '-',
      SUBSTRING(NEW.cpf, 10, 2)
    );
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `formatar_cpf_before_update` BEFORE UPDATE ON `usuarios` FOR EACH ROW BEGIN
  IF NEW.cpf IS NOT NULL AND LENGTH(NEW.cpf) = 11 THEN
    SET NEW.cpf = CONCAT(
      SUBSTRING(NEW.cpf, 1, 3), '.',
      SUBSTRING(NEW.cpf, 4, 3), '.',
      SUBSTRING(NEW.cpf, 7, 3), '-',
      SUBSTRING(NEW.cpf, 10, 2)
    );
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `placa` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletado_em` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `veiculos`
--

INSERT INTO `veiculos` (`id`, `id_usuario`, `id_cliente`, `placa`, `modelo`, `criado_em`, `atualizado_em`, `deletado_em`) VALUES
(1, 1, 1, 'ABC3435', 'civic', '2026-04-15 01:45:05', '2026-04-16 03:18:35', '2026-04-17 01:04:30'),
(2, 6, 2, 'ANC1234', 'Onix', '2026-04-16 03:19:15', '2026-04-16 03:19:15', NULL),
(3, 18, 3, 'ABC1111', 'Polo', '2026-04-17 01:11:46', '2026-04-17 01:11:46', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `enderecos_id_cliente_fkey` (`id_cliente`);

--
-- Índices de tabela `orcamentos`
--
ALTER TABLE `orcamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orcamentos_id_usuario_fkey` (`id_usuario`),
  ADD KEY `orcamentos_id_cliente_fkey` (`id_cliente`),
  ADD KEY `orcamentos_id_veiculo_fkey` (`id_veiculo`),
  ADD KEY `orcamentos_id_departamento_fkey` (`id_departamento`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarios_email_key` (`email`),
  ADD UNIQUE KEY `usuarios_cpf_key` (`cpf`);

--
-- Índices de tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `veiculos_id_usuario_fkey` (`id_usuario`),
  ADD KEY `veiculos_id_cliente_fkey` (`id_cliente`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `orcamentos`
--
ALTER TABLE `orcamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `veiculos`
--
ALTER TABLE `veiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `enderecos_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restrições para tabelas `orcamentos`
--
ALTER TABLE `orcamentos`
  ADD CONSTRAINT `orcamentos_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orcamentos_id_departamento_fkey` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orcamentos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orcamentos_id_veiculo_fkey` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restrições para tabelas `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `veiculos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
