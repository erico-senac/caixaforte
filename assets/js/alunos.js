const tabela = document.querySelector('tbody');

const pegarAluno = async () => {
    await fetch('http://localhost:3000/consulta')
    .then(response => {
        if(!response.ok)
            throw new Error('Não deu certo');
        return response.json();
    })
    .then(dados => {
        dados.forEach(dado => {
            inserir_dados(dado);
        });;
    })
}

const inserir_dados = (dados) => {
    const linha = document.createElement('tr');
    const codigo = document.createElement('td');
    const nome = document.createElement('td');

    codigo.innerHTML = dados.id_aluno;
    nome.innerHTML = dados.nome_aluno;
    linha.appendChild(codigo);
    linha.appendChild(nome);

    tabela.appendChild(linha);
}


pegarAluno();