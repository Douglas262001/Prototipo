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
      return res.status(200).json({ nome: nomeUsuario});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao autenticar usuário' });
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
        'UPDATE conexao.alunos SET nome = ?, url = ?, status_aluno = ?, apelido = ?, motorista = ? WHERE id = ?',
        [aluno.nome, aluno.url, aluno.status_aluno, aluno.apelido, aluno.motorista, req.params.codigoAluno],
        (err, result) => {
          if (err) {  //Utilizando return early pattern.
            console.error(err);
            return res.status(500).json({ message: 'Erro ao atualizar aluno' });
          }
  
          return res.status(200).json(`Carro ${req.params.codigoAluno} atualizado`);
        }
      );
    });

  http.createServer({}, app).listen(3000, () => {
    console.log(`Serviço iniciado`);
  });