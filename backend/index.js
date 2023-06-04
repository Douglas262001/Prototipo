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
        'SELECT u.*, e.nome AS nome_empresa FROM conexao.usuarios u INNER JOIN conexao.empresas e ON u.empresa = e.id WHERE u.email = ? AND u.senha = ?',
        [email, senha]
      );
  
      // Verifica se o usuário existe
      if (!rows || rows.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      const empresaUsuario = rows[0].nome_empresa;
      const nomeUsuario = rows[0].nome;
      const imagemUsuario = rows[0].imagem;
      const idUsuario = rows[0].id;
  
      // Retorna o nome do usuário, imagem e empresa
      return res.status(200).json({ empresa: empresaUsuario, nome: nomeUsuario, imagem: imagemUsuario });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao autenticar usuário' });
    }
  });

  http.createServer({}, app).listen(3000, () => {
    console.log(`Serviço iniciado`);
  });