const mysql = require('mysql2');
const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prototipo'
});

app.get('/', (req, res) => {
  res.json('teste mysql');
});

//Usuários
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM prototipo.usuarios', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/usuarios', (req, res) => {
  const usuario = req.body;
  db.query(
    'INSERT INTO prototipo.usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [usuario.nome, usuario.email, usuario.senha],
    (err, result) => {
      if (err) { 
        console.error(err);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      }

      return res.status(200).json(`Aluno ${usuario.nome} criado`);;
    }
  );
});

//Login Usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o email e a senha foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ message: 'Informe o email e a senha' });
  }

  try {
    // Consulta o usuário no banco de dados pelo email
    const [rows] = await db.promise().query(
      'SELECT * FROM prototipo.usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );

    // Verifica se o usuário existe
    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const nomeUsuario = rows[0].nome;

    return res.status(200).json({ nome: nomeUsuario });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
});

//Login motorista
app.post('/loginMotorista', async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o email e a senha foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ message: 'Informe o email e a senha' });
  }

  try {
    // Consulta o motorista no banco de dados pelo email
    const [rows] = await db.promise().query(
      'SELECT * FROM prototipo.motoristas WHERE email = ? AND senha = ?',
      [email, senha]
    );

    // Verifica se o motorista existe
    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const motoristaAluno = rows[0].id;

    return res.status(200).json({ id: motoristaAluno});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao autenticar login do motorista' });
  }
});

//Alunos
app.get('/alunos', (req, res) => {
  db.query('SELECT * FROM prototipo.alunos ORDER BY id DESC', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/alunosMotorista/:motoristaAluno', (req, res) => {
  db.query('SELECT * FROM prototipo.alunos WHERE motorista = ?',
  [req.params.motoristaAluno],
   (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/alunos', (req, res) => {
  const aluno = req.body;
  db.query(
    'INSERT INTO prototipo.alunos (nome, url, status_aluno, apelido, motorista) VALUES (?, ?, ?, ?, ?)',
    [aluno.nome, aluno.url, aluno.status_aluno, aluno.apelido, aluno.motorista],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar aluno' });
      }

      return res.status(200).json(`Aluno ${aluno.nome} criado`);;
    }
  );
});

app.delete('/alunos/:codigoAluno', (req, res) => {
  db.query(
    'DELETE FROM prototipo.alunos WHERE id = ?',
    [req.params.codigoAluno],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro ao excluir aluno' });
      }

      return res.status(200).json(`Aluno ${req.params.codigoAluno} excluído`);
    }
  );
});

app.put('/alunos/:codigoAluno', (req, res) => {
  const aluno = req.body;
  db.query(
    'UPDATE prototipo.alunos SET nome = ?, url = ?, status_aluno = ?, apelido = ?, motorista = ? WHERE id = ?',
    [aluno.nome, aluno.url, aluno.status_aluno, aluno.apelido, aluno.motorista, req.params.codigoAluno],
    (err, result) => {
      if (err) { 
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar aluno' });
      }

      return res.status(200).json(`Aluno ${req.params.codigoAluno} atualizado`);
    }
  );
});

//Motoristas
app.get('/motoristas', (req, res) => {
  db.query('SELECT * FROM prototipo.motoristas ORDER BY id DESC', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/motoristas', (req, res) => {
  const motorista = req.body;
  db.query(
    'INSERT INTO prototipo.motoristas (nome, idade) VALUES (?, ?)',
    [motorista.nome, motorista.idade],
    (err, result) => {
      if (err) {  //Utilizando return early pattern.
        console.error(err);
        return res.status(500).json({ message: 'Erro ao criar motorista' });
      }

      return res.status(200).json(`Motorista ${motorista.nome} criado`);;
    }
  );
});

app.delete('/motoristas/:codigoMotorista', (req, res) => {
  db.query(
    'DELETE FROM prototipo.motoristas WHERE id = ?',
    [req.params.codigoMotorista],
    (err, result) => {
      if (err) { 
        console.error(err);
        return res.status(500).json({ message: 'Erro ao excluir motorista' });
      }

      return res.status(200).json(`Motorista ${req.params.codigoMotorista} excluído`);
    }
  );
});

app.put('/motoristas/:codigoMotorista', (req, res) => {
  const motorista = req.body;
  db.query(
    'UPDATE prototipo.motoristas SET nome = ?, idade = ? WHERE id = ?',
    [motorista.nome, motorista.idade, req.params.codigoMotorista],
    (err, result) => {
      if (err) { 
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar motorista' });
      }

      return res.status(200).json(`Motorista ${req.params.codigoMotorista} atualizado`);
    }
  );
});

//Enviando dados de presença para o banco
app.post('/marcarPresenca', (req, res) => {
  
  const { presenca } = req.body;

  // Verifica se a lista de presenças está vazia
  if (!presenca || presenca.length === 0) {
    return res.status(400).json({ message: 'A lista de presenças está vazia' });
  }

  // Array para armazenar as consultas SQL
  const queries = [];

  // Itera sobre a lista de presenças e cria as consultas SQL para marcar a presença de cada uma
  presenca.forEach(({local, apelido, status_aluno, presenca}) => {
    const query = `
      INSERT INTO presenca (localizacao, apelido, status_aluno, presenca)
      VALUES (?, ?, ?, ?)
    `;
    const values = [local, apelido, status_aluno, presenca];
    queries.push({ query, values });
  });

  // Executa as consultas SQL em uma única transação
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao obter conexão do banco de dados:', err);
      return res.status(500).json({ message: 'Erro ao marcar presença dos alunos' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.error('Erro ao iniciar transação do banco de dados:', err);
        return res.status(500).json({ message: 'Erro ao marcar presença dos alunos' });
      }

      // Executa as consultas SQL em uma única transação
      const promises = queries.map(({ query, values }) => {
        return new Promise((resolve, reject) => {
          connection.query(query, values, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });

      // Executa todas as consultas em paralelo
      Promise.all(promises)
        .then(() => {
          connection.commit((err) => {
            if (err) {
              console.error('Erro ao commitar transação do banco de dados:', err);
              return res.status(500).json({ message: 'Erro ao marcar presença dos alunos' });
            }

            connection.release();
            return res.status(200).json({ message: 'Presença dos alunos marcada com sucesso' });
          });
        })
        .catch((err) => {
          console.error('Erro ao executar consultas do banco de dados:', err);
          connection.rollback(() => {
            connection.release();
            return res.status(500).json({ message: 'Erro ao marcar presença dos alunos' });
          });
        });
    });
  });
});

http.createServer({}, app).listen(3000, () => {
  console.log(`Serviço iniciado`);
});