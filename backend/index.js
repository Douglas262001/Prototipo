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
  db.query('SELECT * FROM conexao.usuarios', (err, result) => {
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
        'SELECT * FROM conexao.usuarios WHERE email = ? AND senha = ?',
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

  http.createServer({}, app).listen(3000, () => {
    console.log(`Serviço iniciado`);
  });