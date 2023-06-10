const listaPessoal = [];

function buscarAlunosDoBancoDeDados() {
    fetch('http://localhost:3000/alunosCrescente')
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
    csv += `${data.value},${hora.value},${localElement.textContent}\n`;
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
  
  // Adiciona o manipulador de eventos para o elemento select
  const tipoSelect = document.getElementById('tipo-select');
  tipoSelect.addEventListener('change', function () {
    filtrarPorTipo(this.value);
  });