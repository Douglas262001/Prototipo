const listaPessoal = [];

function buscarAlunosDoBancoDeDados() {
    fetch('http://localhost:3000/alunos')
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
  
  const exportarCsvBtn = document.getElementById('exportar-csv');
  exportarCsvBtn.addEventListener('click', function () {
    let selectedCards = [];
    let unselectedCards = [];
    const allCards = document.querySelectorAll('.card');
    const data = document.getElementById('dia');
    const hora = document.getElementById('hora');
    const local = document.getElementById('local');
  
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
    csv += `${data.value},${hora.value},${local.value}\n`;
    csv += 'Situacao,apelido,status\n';
    selectedCards.forEach(card => {
      csv += `PRESENTE,${card.apelido},${card.status_aluno}\n`;
    });
    unselectedCards.forEach(card => {
      csv += `FALTA,${card.apelido},${card.status_aluno}\n`;
    });
  
    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cartoes.csv');
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
  