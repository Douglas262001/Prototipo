CREATE DATABASE prototipo; -- Crie um novo banco de dados (se ainda não existir)

USE prototipo; -- Use o banco de dados recém-criado

DROP TABLE prototipo.alunos;

CREATE TABLE prototipo.usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    senha VARCHAR(10) NOT NULL
);

CREATE TABLE prototipo.alunos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  status_aluno VARCHAR(255) NOT NULL,
  apelido VARCHAR(255) NOT NULL,
  motorista INT NOT NULL,
  constraint fk_aluno_motorista foreign key (motorista) REFERENCES motoristas(id)
);

CREATE TABLE prototipo.motoristas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  idade INT NOT NULL,
  email VARCHAR(40) NOT NULL,
  senha VARCHAR(10) NOT NULL
);

INSERT INTO prototipo.usuarios (id, nome, email, senha) 
VALUES (1, 'Usuario1', 'usuario1@empresa.net', 'senha123');

INSERT INTO prototipo.usuarios (id, nome, email, senha) 
VALUES (2, 'Usuario2', 'usuario2@empresa.net', 'senha456');

INSERT INTO prototipo.alunos (nome, url, status_aluno, apelido, motorista) VALUES
  ('ANSELMO PADILHA TESKE', ' ', 'ATIVO', 'ANSELMO', 1),
  ('BRUNO CARDOSO', ' ', 'ATIVO', 'BRUNO C.', 1),
  ('BRUNO HOBOLD', ' ', 'ATIVO', 'BRUNO H.', 1),
  ('DOUGLAS ASSUNÇÃO RAMPINELLI', ' ', 'ATIVO', 'DOUGLAS', 1),
  ('EDUARDO PEDRO MENEGHEL', ' ', 'ATIVO', 'EDUARDO', 1),
  ('ILSON WARMELING', ' ', 'ATIVO', 'ILSON', 1),
  ('JUAN CARLOS REDIVO', ' ', 'ATIVO', 'JUAN', 1),
  ('JULIAN BUSS SATURNO', ' ', 'ATIVO', 'JULIAN', 1),
  ('JOÃO VITOR MORAES', ' ', 'ATIVO', 'JOÃO', 1),
  ('LEANDRO HEIDEMAN', ' ', 'ATIVO', 'LEANDRO', 1),
  ('LUCAS CORREA NAZÁRIO', '', 'ATIVO', 'LUCAS C.', 1),
  ('LUCAS MICHELS', ' ', 'ATIVO', 'LUCAS M.', 1),
  ('YVAN AUGUSTO', ' ', 'PARCIAL', 'YVAN', 1),
  ('GUSTAVO RODRIGUES', ' ', 'NULO', 'GUSTAVO', 1);
  
INSERT INTO prototipo.motoristas (id, nome, idade, email, senha) 
VALUES (1, 'Rodrigo', 34, 'motorista1@empresa.net', 'senha123');
  