const salvarDados = (dados) => {
    localStorage.setItem('dados', JSON.stringify(dados));
}

const apagarRegistro = (dados, condicao) => {
    novo = dados.filter(dado => dado.descricao !== condicao)
    return novo;
}