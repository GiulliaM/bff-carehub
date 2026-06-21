-- Reset de dados para teste limpo do fluxo familiar -> paciente.
-- Apaga TODOS os familiares e TODOS os pacientes (e dados dependentes).
-- PRESERVA: admin e cuidadores (usuarios.tipo IN ('admin','cuidador')).
--
-- Uso: mysql -u <user> -p <database> < migrations/002_reset_familiares_pacientes.sql
-- Depois, cadastre um familiar novo pelo app e crie um paciente por ele:
-- o vinculo em grupo_cuidado e criado automaticamente (papel 'dono', status 'Ativo').

SET FOREIGN_KEY_CHECKS = 0;

-- Dados clinicos / rotina ligados a pacientes
DELETE FROM diario_itens;
DELETE FROM diario_registros;
DELETE FROM medicamento_doses;
DELETE FROM medicamentos;
DELETE FROM grupo_cuidado_responsaveis;
DELETE FROM tarefas;
DELETE FROM historico_medico;
DELETE FROM vacinas;
DELETE FROM convites_vinculo;

-- Vinculos
DELETE FROM grupo_cuidado;
DELETE FROM vinculos_cuidador_paciente;

-- Pacientes
DELETE FROM pacientes;

-- Apenas os usuarios familiares (mantem admin e cuidadores)
DELETE FROM usuarios WHERE tipo = 'familiar';

SET FOREIGN_KEY_CHECKS = 1;
