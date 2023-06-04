function submitForm(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores de email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, senha: senha })
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Converte a resposta para JSON
            } else if (response.status === 401) {
                alert('Credenciais inválidas');
                throw new Error('Credenciais inválidas');
            } else {
                alert.log('Erro ao autenticar usuário');
                throw new Error('Erro ao autenticar usuário');
            }
        })
        .then(data => {
            const nomeUsuario = data.nome;
            const dadosUsuario = {
                nome: nomeUsuario,
            };
            console.log(dadosUsuario)
            console.log(data)
            // Salva os dados do usuário no localStorage
            localStorage.setItem('userData', JSON.stringify(dadosUsuario));

            window.location.href = "cadastroAlunosMotoristas.html";
        })
        .catch(error => {
            console.error('Erro ao obter os dados do usuário:', error);
        });
}

const carregarAlunos = () => {
    fetch('http://localhost:3000/alunos')
        .then((response) => response.json())
        .then((dados) => {
            document.getElementById('conteudo-alunos').innerHTML = dados.reverse().reduce((acumulador, aluno) => {
                return acumulador + `
                    <div style='display: flex; gap: 4px;'>
                        <input id='aluno-id-${aluno.id}' disabled style='color: red; width: 50px;' value='${aluno.id}'></input>
                        <input id='aluno-nome-${aluno.id}' style='color: red' value='${aluno.nome}'></input>
                        <input id='aluno-url-${aluno.id}' style='color: red' value='${aluno.url}'></input>
                        <input id='aluno-status_aluno-${aluno.id}' style='color: red' value='${aluno.status_aluno}'></input>
                        <input id='aluno-apelido-${aluno.id}' style='color: red' value='${aluno.apelido}'></input>
                        <input id='aluno-motorista-${aluno.id}' style='color: red' value='${aluno.motorista}'></input>
                        <button onclick="alterarAluno(${aluno.id})">Alterar</button>
                        <button onclick="excluirAluno(${aluno.id})">Excluir</button>
                    </div>
                `;
            }, '');
        })
}

const alterarAluno = (id) => {
    const nome = document.getElementById(`aluno-nome-${id}`).value;
    const url = document.getElementById(`aluno-url-${id}`).value;
    const status_aluno = document.getElementById(`aluno-status_aluno-${id}`).value;
    const apelido = document.getElementById(`aluno-apelido-${id}`).value;
    const motorista = document.getElementById(`aluno-motorista-${id}`).value;
    fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, url: url, status_aluno: status_aluno, apelido: apelido, motorista: motorista})
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        carregarAlunos();
    })
}

const excluirAluno = (id) => {
    fetch(`http://localhost:3000/alunos/${id}`, {
        method: 'DELETE',
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json(), 'rgb(255 59 59 / 77%)');
        carregarAlunos();
    })
}

const inserirAluno = (aluno = {}) => {
    const nome = document.getElementById('nome').value;
    const url = document.getElementById('url').value;
    const status_aluno = document.getElementById('status_aluno').value;
    const apelido = document.getElementById('apelido').value;
    const motorista = document.getElementById('motorista').value;
    fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, url: url, status_aluno: status_aluno, apelido: apelido, motorista: motorista})
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json(), 'rgb(59 255 59 / 77%)');
        limparCampos();
        carregarAlunos();
    })
}

const limparCampos = () => {
    document.getElementById('nome').value = '';
    document.getElementById('url').value = '';
    document.getElementById('status_aluno').value = '';
    document.getElementById('apelido').value = '';
    document.getElementById('motorista').value = '';
}

const mostrarMensagem = (mensagem, corFundo = 'rgb(59 59 255 / 77%)') => {
    const codigoMensagem = Math.random();
    const div = document.createElement('div');
    div.id = `mensagem-${codigoMensagem}`;
    div.innerText = mensagem;
    div.style = `background: ${corFundo}; color: white; padding: 10px;`;
    const elementoMensagens = document.getElementById('mensagens');
    elementoMensagens.insertBefore(div, elementoMensagens.firstChild);
    setTimeout(() => {
        document.getElementById(`mensagem-${codigoMensagem}`).remove();
    }, 5000);
}

// Função para enviar o formulário de cadastro
function cadastrarUsuario() {
    // Capturar os valores dos campos do formulário
    const nome = document.getElementById('nomeInput').value;
    const email = document.getElementById('emailInput').value;
    const senha = document.getElementById('senhaInput').value;

    // Criar um objeto com os dados do usuário
    const usuario = {
      nome: nome,
      email: email,
      senha: senha
    };

    // Enviar a solicitação POST para o servidor
    fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao cadastrar usuário');
        }
      })
      .then(data => {
        // Exibir mensagem de sucesso para o usuário
        alert(`Usuário ${data} cadastrado com sucesso!`);
      })
      .catch(error => {
        // Exibir mensagem de erro para o usuário
        console.error(error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
      });
  }

  // Capturar o evento de submissão do formulário
  const form = document.getElementById('cadastroForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o envio do formulário padrão
    cadastrarUsuario();
  });