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

