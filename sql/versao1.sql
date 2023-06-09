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
  ('ANSELMO PADILHA TESKE', 'https://img.freepik.com/vetores-premium/icone-de-circulo-de-usuario-anonimo-estilo-simples-de-ilustracao-vetorial-com-sombra-longa_520826-1931.jpg', 'ATIVO', 'ANSELMO', 1),
  ('BRUNO CARDOSO', 'https://media.licdn.com/dms/image/D4D03AQFcwbYLU7kTKg/profile-displayphoto-shrink_800_800/0/1681000222194?e=1691625600&v=beta&t=YAygzalraVTmKKB-8rRWIpTU46V0UJvXC1LR7_wODWE', 'ATIVO', 'BRUNO C.', 1),
  ('BRUNO HOBOLD', 'https://media.licdn.com/dms/image/C4E03AQEEA1lzyCL_Ww/profile-displayphoto-shrink_800_800/0/1630200338762?e=1691625600&v=beta&t=i5ldFmeIGIzLSUHkikFztmSzfQI20tqNhlFbGNcsCnc', 'ATIVO', 'BRUNO H.', 1),
  ('DOUGLAS ASSUNÇÃO RAMPINELLI', 'https://media.licdn.com/dms/image/C4D03AQHYAO1y1qXZ_w/profile-displayphoto-shrink_800_800/0/1607835219688?e=1691625600&v=beta&t=ZaydRvPmxNNZX9mp2S9Y0Z3tEBUnm-QBalzvXQSkGvw', 'ATIVO', 'DOUGLAS', 1),
  ('EDUARDO PEDRO MENEGHEL', 'https://media.licdn.com/dms/image/C4D03AQF4cYE6NtTpMA/profile-displayphoto-shrink_800_800/0/1650914063231?e=1691625600&v=beta&t=tRsvJ1HC3e6xD__Va9Bj9cOMhxmn67rOjnQipYgDqjw', 'ATIVO', 'EDUARDO', 1),
  ('ILSON WARMELING', 'https://media.licdn.com/dms/image/D5603AQE2jsweBUhf1w/profile-displayphoto-shrink_800_800/0/1677777399034?e=1691625600&v=beta&t=oXsYwANs5yv_SExArCq-lH60uZVJ7_kjxiJGUVoDHOU', 'ATIVO', 'ILSON', 1),
  ('JUAN CARLOS REDIVO', 'https://media.licdn.com/dms/image/C4D03AQHgvlAPqkeoJA/profile-displayphoto-shrink_800_800/0/1660018204722?e=1691625600&v=beta&t=VzX3uUfLejv-z_I84PuUBBbAMF77w3wE6HOQe6rENJw', 'ATIVO', 'JUAN', 1),
  ('JULIAN BUSS SATURNO', 'https://media.licdn.com/dms/image/C4D03AQGddGynExOemQ/profile-displayphoto-shrink_800_800/0/1633528401435?e=1691625600&v=beta&t=GM-trxYzpTqdzILtLUEcoQiuHtZVZGkaY8lsm6z6Swc', 'ATIVO', 'JULIAN', 1),
  ('JOÃO VITOR MORAES', 'https://media.licdn.com/dms/image/D4D35AQEK5cR20NEu2g/profile-framedphoto-shrink_800_800/0/1678050541271?e=1686880800&v=beta&t=Lp3apnh39_ZIIQ-X6ZavtlUwmIzcuM4HbaXVvtvQbHk', 'ATIVO', 'JOÃO', 1),
  ('LEANDRO HEIDEMAN', 'https://media.licdn.com/dms/image/C4D03AQHl6LhqLfewOw/profile-displayphoto-shrink_800_800/0/1604423661337?e=1691625600&v=beta&t=g467gOTd0YZl_mrln6QEdS1fCRuXFHHE7XhUkQBwvkE', 'ATIVO', 'LEANDRO', 1),
  ('LUCAS CORREA NAZÁRIO', 'https://media.licdn.com/dms/image/C4D03AQGp5rxNVqi-Cg/profile-displayphoto-shrink_800_800/0/1611621018798?e=1691625600&v=beta&t=f_jBJlyIRm9cJdmR6EMM4KoHAlYp5p85V0HxmqXvC_o', 'ATIVO', 'LUCAS C.', 1),
  ('LUCAS MICHELS', 'https://img.freepik.com/vetores-premium/icone-de-circulo-de-usuario-anonimo-estilo-simples-de-ilustracao-vetorial-com-sombra-longa_520826-1931.jpg', 'ATIVO', 'LUCAS M.', 1),
  ('LUIS ERCOLIN', 'https://media.licdn.com/dms/image/C4D03AQE_xKuKyVvO1A/profile-displayphoto-shrink_800_800/0/1653420024678?e=1691625600&v=beta&t=_M0RBGXMv6YPCd11fayUspoYdb4cdxtWw_WQ0miQ4OA', 'PARCIAL', 'LUIS', 1),
  ('YVAN AUGUSTO', 'https://media.licdn.com/dms/image/C4E03AQEjUMrofvl_1w/profile-displayphoto-shrink_800_800/0/1654887953794?e=1691625600&v=beta&t=k4QP36V9xh4G8e5-TIq7qnhjsAJyxsErggyJyrJ4RfU', 'ATIVO', 'YVAN', 1),
  ('GUSTAVO RODRIGUES', 'https://cdn-icons-png.flaticon.com/512/17/17004.png', 'NULO', 'GUSTAVO', 1);
  
INSERT INTO prototipo.motoristas (id, nome, idade, email, senha) 
VALUES (1, 'Rodrigo', 34, 'motorista1@empresa.net', 'senha123');
  