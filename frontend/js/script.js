fetch('http://localhost:3000/presenca')
  .then(response => response.json())
  .then(data => {
    const tabelaPresenca = document.getElementById('tabela-presenca');
    const tituloPresenca = document.getElementById('titulo-presenca');
    const dataHorario = new Date(data[0].data_horario);

    // Formatação da data
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataFormatada = dataHorario.toLocaleDateString('pt-BR', options);

    tituloPresenca.textContent = `Dados de Presença - ${dataFormatada}`;

    data.forEach(row => {
      const newRow = tabelaPresenca.insertRow();

      const localizacaoCell = newRow.insertCell();
      localizacaoCell.textContent = row.localizacao;

      const apelidoCell = newRow.insertCell();
      apelidoCell.textContent = row.apelido;

      const statusCell = newRow.insertCell();
      statusCell.textContent = row.status_aluno;

      const presencaCell = newRow.insertCell();
      presencaCell.textContent = row.presenca;
    });
  })
  .catch(error => {
    console.error('Erro ao obter os dados de presença:', error);
  });

function submitFormMotorista(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Obtém os valores de email e senha
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  fetch('http://localhost:3000/loginMotorista', {
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
              alert('Erro ao autenticar motorista');
              throw new Error('Erro ao autenticar motorista');
          }
      })
      .then(data => {
          const motorista = data.id;
          dadosMotorista = motorista;
          alert("Motorista: " + dadosMotorista + ", fez login!");
          console.log(data)
          // Salva os dados do motorista no localStorage
          localStorage.setItem('idMotorista', JSON.stringify(dadosMotorista));

          window.location.href = "chamadaAlunos.html";
      })
      .catch(error => {
          console.error('Erro ao obter os dados do motorista:', error);
      });
}

const listaPessoal = [];

function buscarAlunosDoBancoDeDados() {
  fetch(`http://localhost:3000/alunosMotorista/${localStorage.getItem('idMotorista')}`)
    .then(response => response.json())
    .then(result => {
      listaPessoal.length = 0; // Limpa a listaPessoal antes de preenchê-la novamente

      result.forEach(aluno => {
        const nome = aluno.nome;
        const url = aluno.url;
        const status_aluno = aluno.status_aluno;
        const apelido = aluno.apelido;
        const dadosAluno = { url, status_aluno, apelido };
        listaPessoal.push(dadosAluno);
      });

      criarTela(); // Chama a função para criar a tela com base na listaPessoal atualizada
    })
    .catch(error => console.error(error));
}

// Chamada inicial para buscar os alunos do banco de dados e atualizar a listaPessoal
buscarAlunosDoBancoDeDados();
  
  function popularCard(telaCards, pessoa) {
    const url = pessoa.url;
    const apelido = pessoa.apelido;
    const status_aluno = pessoa.status_aluno;
    telaCards.innerHTML += `
      <div class="card mx-4 mt-4" style="width: 8rem; display: inline-block;">
        <img src="${url}" alt="Pessoa 1" style="width: 100%;">
        <h5>${apelido}</h5>
        <p>${status_aluno}</p>
      </div>
    `;
  }
  
  function criarLinha(linha, pessoas) {
    linha.innerHTML += `<main class="linha" style="text-align: center;">`;
    for (let pessoa of pessoas) {
      const elementsClass = document.getElementsByClassName('linha');
      popularCard(elementsClass[elementsClass.length - 1], pessoa);
    }
    linha.innerHTML += `</main><br>`;
  }
  
  function criarTela() {
    const linha = document.getElementById('cards');
    linha.innerHTML = ''; // Limpa o conteúdo atual
  
    const chunkedPessoas = chunkArray(listaPessoal, 4); // Divide a listaPessoal em grupos de 4
  
    chunkedPessoas.forEach(pessoas => {
      criarLinha(linha, pessoas);
    });
  
    criarLinha(linha, listaPessoal.slice(listaPessoal.length)); // Cria a última linha com os elementos restantes
  
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', function () {
        this.classList.toggle('bg-success');
      });
    });
  }
  
  function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }

  var localizacao = document.getElementById('local');
  var intervalo = 60000; // Intervalo de 1 minuto (em milissegundos)
  var watchID = null;

  function success(pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;

    // Fazer uma solicitação à API aqui para obter o endereço
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.address) {
          var address = data.address;
          var enderecoDescritivo = `${address.road}, ${address.town}, ${address.state}, ${address.country}`;
          localizacao.textContent = enderecoDescritivo;
        } else {
          console.log('Erro na obtenção do endereço.');
        }
      })
      .catch(error => {
        console.log('Erro na requisição:', error);
      });

    // Agendar a próxima chamada à função success após o intervalo de tempo
    watchID = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(success, error);
    }, intervalo);
  }

  function error(err) {
    console.log(err);
  }

  // Iniciar a primeira chamada à função success
  navigator.geolocation.getCurrentPosition(success, error);

// Captura o elemento HTML
var dataHorarioElement = document.getElementById("data-horario");

// Função para formatar o número com zero à esquerda se for menor que 10
function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}

// Função para obter a data e o horário local
function getDataHorarioLocal() {
  var dataAtual = new Date();
  var dia = formatNumber(dataAtual.getDate());
  var mes = formatNumber(dataAtual.getMonth() + 1);
  var ano = dataAtual.getFullYear();
  var hora = formatNumber(dataAtual.getHours());
  var minutos = formatNumber(dataAtual.getMinutes());
  var segundos = formatNumber(dataAtual.getSeconds());

  var dataHorarioLocal = dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos + ":" + segundos;

  return dataHorarioLocal;
}

// Função para atualizar o horário
function atualizarHorario() {
  dataHorarioElement.textContent = getDataHorarioLocal();
}

// Chama a função para atualizar o horário imediatamente
atualizarHorario();

// Atualiza o horário a cada minuto (60.000 milissegundos)
setInterval(atualizarHorario, 60000);

  const exportarCsvBtn = document.getElementById('exportar-csv');
  exportarCsvBtn.addEventListener('click', function () {
    let selectedCards = [];
    let unselectedCards = [];
    const allCards = document.querySelectorAll('.card');
    const data = document.getElementById('dia');
    const hora = document.getElementById('hora');
    const localElement = document.getElementById('local');
  
    allCards.forEach(card => {
      const apelido = card.querySelector('h5').innerText;
      const status_aluno = card.querySelector('p').innerText;
      if (card.classList.contains('bg-success')) {
        selectedCards.push({ apelido, status_aluno });
      } else {
        unselectedCards.push({ apelido, status_aluno });
      }
    });
  
    let csv = 'data:text/csv;charset=utf-8,';
    csv += 'Data,Hora,Local\n';
    // Obter data e horário local
    var dataAtual = new Date();
    var dataLocal = dataAtual.toLocaleDateString();
    var horarioLocal = dataAtual.toLocaleTimeString();

    csv += `${dataLocal},${horarioLocal},${localElement.textContent}\n`;
    csv += 'Situação,Apelido,Status\n';

    selectedCards.forEach(card => {
      csv += `PRESENTE,${card.apelido},${card.status_aluno}\n`;
    });

    unselectedCards.forEach(card => {
      csv += `FALTA,${card.apelido},${card.status_aluno}\n`;
    });
  
    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'lista de presenca.csv');
    document.body.appendChild(link);
    link.click();
  });  
  
  function filtrarPorTipo(tipoSelecionado) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const tipoElemento = card.querySelector('p').innerText;
      if (tipoSelecionado === 'Todos' || tipoSelecionado === tipoElemento) {
        card.style.display = 'inline-block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
// Enviando os dados de presença do aluno
function enviarDadosParaServidor() {
  const allCards = document.querySelectorAll('.card');
  const localElement = document.getElementById('local');
  const local = localElement.textContent;

  const presenca = [];

  allCards.forEach((card) => {
    const apelido = card.querySelector('h5').innerText;
    const status_aluno = card.querySelector('p').innerText;
    let presencaAluno = " ";

    if (card.classList.contains('bg-success')) {
      presencaAluno = "PRESENTE";
    } else {
      presencaAluno = "AUSENTE";
    }

    presenca.push({
      local: local,
      apelido: apelido,
      status_aluno: status_aluno,
      presenca: presencaAluno
    });
  });
  
    const requestData = { presenca };
  
    fetch('http://localhost:3000/marcarPresenca', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Dados enviados com sucesso para o servidor!');
        } else {
          console.error('Erro ao enviar dados para o servidor:', response.status);
          console.log(requestData);
        }
      })
      .catch((error) => {
        console.error('Erro ao enviar dados para o servidor:', error);
      });
  }
  
  const enviarDadosBtn = document.getElementById('enviar-dados');
  enviarDadosBtn.addEventListener('click', enviarDadosParaServidor);  

  // Adiciona o manipulador de eventos para o elemento select
  const tipoSelect = document.getElementById('tipo-select');
  tipoSelect.addEventListener('change', function () {
    filtrarPorTipo(this.value);
  });