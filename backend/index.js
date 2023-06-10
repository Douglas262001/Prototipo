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

//usuários
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
      if (err) {  //Utilizando return early pattern.
        console.error(err);
        return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      }

      return res.status(200).json(`Aluno ${usuario.nome} criado`);;
    }
  );
});

//Login usuário
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

    // Retorna o nome do usuário, imagem e empresa
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
    // Consulta o usuário no banco de dados pelo email
    const [rows] = await db.promise().query(
      'SELECT * FROM prototipo.motoristas WHERE email = ? AND senha = ?',
      [email, senha]
    );

    // Verifica se o usuário existe
    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const nomeMotorista = rows[0].nome;

    // Retorna o nome do usuário, imagem e empresa
    return res.status(200).json({ nome: nomeMotorista });
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

app.get('/alunosCrescente', (req, res) => {
  db.query('SELECT * FROM prototipo.alunos', (err, result) => {
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
      if (err) {  //Utilizando return early pattern.
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
      if (err) {  //Utilizando return early pattern.
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
      if (err) {  //Utilizando return early pattern.
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
    'INSERT INTO prototipo.motoristas (nome, idade, email, senha) VALUES (?, ?, ?, ?)',
    [motorista.nome, motorista.idade, motorista.email, motorista.senha],
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
      if (err) {  //Utilizando return early pattern.
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
    'UPDATE prototipo.motoristas SET nome = ?, idade = ?, email = ?, senha = ? WHERE id = ?',
    [motorista.nome, motorista.idade, motorista.email, motorista.senha, req.params.codigoMotorista],
    (err, result) => {
      if (err) {  //Utilizando return early pattern.
        console.error(err);
        return res.status(500).json({ message: 'Erro ao atualizar motorista' });
      }

      return res.status(200).json(`Motorista ${req.params.codigoMotorista} atualizado`);
    }
  );
});

http.createServer({}, app).listen(3000, () => {
  console.log(`Serviço iniciado`);
});