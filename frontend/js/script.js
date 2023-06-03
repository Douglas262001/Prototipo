let pessoal = {
    "ANSELMO PADILHA TESKE": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "ANSELMO"
    },
    "BRUNO CARDOSO": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "BRUNO C."
    },
    "BRUNO HOBOLD": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "BRUNO H."
    },
    "DOUGLAS ASSUNÇÃO RAMPINELLI": {
        "url": "../img/DOUGLAS.jpg",
        "status": "ATIVO",
        "apelido": "DOUGLAS"
    },
    "EDUARDO PEDRO MENEGHEL": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "EDUARDO"
    },
    "ILSON WARMELING": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "ILSON"
    },
    "JUAN CARLOS REDIVO": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "JUAN"
    },
    "JULIAN BUSS SATURNO": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "JULIAN"
    },
    "JOÃO VITOR MORAES": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "JOÃO"
    },
    "LEANDRO HEIDEMAN": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "LEANDRO"
    },
    "LUCAS CORREA NAZÁRIO": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "LUCAS C."
    },
    "LUCAS MICHELS": {
        "url": "../img/user.png",
        "status": "ATIVO",
        "apelido": "LUCAS M."
    },
    "YVAN AUGUSTO": {
        "url": "../img/user.png",
        "status": "PARCIAL",
        "apelido": "YVAN"
    },
    "GUSTAVO RODRIGUES": {
        "url": "../img/user.png",
        "status": "NULO",
        "apelido": "GUSTAVO"
    }
}

const listaPessoal = [];
console.log(listaPessoal);
for (let pessoa in pessoal) {
    listaPessoal.push(pessoal[pessoa]);
}
criarTela();

function popularCard(telaCards, pessoa) {
    const url = pessoa.url;
    const apelido = pessoa.apelido;
    const status = pessoa.status;
    console.log(pessoa);
    telaCards.innerHTML += `
        <div class="card mx-4 mt-4" style="width: 8rem; display: inline-block;">
            <img src="${url}" alt="Pessoa 1" style="width: 100%;">
            <h5>${apelido}</h5>
            <p>${status}</p>
        </div>
        `
}

function criarLinha(linha, pessoas) {
    linha.innerHTML += `<main class="linha" style="text-align: center;">`
    for (let pessoa of pessoas) {
        const elementsClass = document.getElementsByClassName("linha");
        popularCard(elementsClass[elementsClass.length - 1], pessoa);
    }
    linha.innerHTML += `</main><br>`
}

function criarTela() {
    const linha = document.getElementById('cards');
    for (let i = 0; i < 3; i++) {
        criarLinha(linha, [
            listaPessoal[4 * i],
            listaPessoal[4 * i + 1],
            listaPessoal[4 * i + 2],
            listaPessoal[4 * i + 3]
        ]);
    }
    criarLinha(linha, [
        listaPessoal[12], listaPessoal[13]
    ]);
}

const cards = document.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        this.classList.toggle('bg-success');
    });
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
        const status = card.querySelector('p').innerText;
        if (card.classList.contains('bg-success')) {
            selectedCards.push({ apelido, status });
        } else {
            unselectedCards.push({ apelido, status });
        }
    });
    let csv = "data:text/csv;charset=utf-8,";
    csv += "Data,Hora,Local\n";
    csv += `${data.value},${hora.value},${local.value}\n`;
    csv += "Situacao,apelido,status\n";
    selectedCards.forEach(card => {
        csv += `PRESENTE,${card.apelido},${card.status}\n`;
    });
    unselectedCards.forEach(card => {
        csv += `FALTA,${card.apelido},${card.status}\n`;
    });
    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cartoes.csv");
    document.body.appendChild(link);
    link.click();
});

function filtrarPorTipo(tipoSelecionado) {
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        const tipoElemento = cards[i].querySelector('p').innerText;
        if (tipoSelecionado === 'Todos' || tipoSelecionado === tipoElemento) {
            cards[i].style.display = 'inline-block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

const data = document.getElementById('dia').value;

// Adiciona o manipulador de eventos para o elemento select
const tipoSelect = document.getElementById('tipo-select');
tipoSelect.addEventListener('change', function () {
    filtrarPorTipo(this.value);
});