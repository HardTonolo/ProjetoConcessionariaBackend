-- DropForeignKey
ALTER TABLE `enderecos` DROP FOREIGN KEY `enderecos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orcamentos` DROP FOREIGN KEY `orcamentos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `orcamentos` DROP FOREIGN KEY `orcamentos_ibfk_2`;

-- DropForeignKey
ALTER TABLE `orcamentos` DROP FOREIGN KEY `orcamentos_ibfk_3`;

-- DropForeignKey
ALTER TABLE `veiculos` DROP FOREIGN KEY `veiculos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `veiculos` DROP FOREIGN KEY `veiculos_ibfk_2`;

-- DropForeignKey
ALTER TABLE `veiculos` DROP FOREIGN KEY `veiculos_ibfk_3`;

-- AlterTable
ALTER TABLE `orcamentos` ADD COLUMN `id_departamento` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_id_veiculo_fkey` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_id_departamento_fkey` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculos` ADD CONSTRAINT `veiculos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculos` ADD CONSTRAINT `veiculos_id_departamento_fkey` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veiculos` ADD CONSTRAINT `veiculos_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `usuarios_email_key` ON `usuarios`(`email`);
DROP INDEX `email` ON `usuarios`;
