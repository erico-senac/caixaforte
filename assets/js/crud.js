const salvarDados = (dado, index = null) => {
    if(index === null)
        dados.push(dado);
    else
        dados[index] = dado;
    
    localStorage.setItem('dados', JSON.stringify(dados));
}

const apagarRegistro = (index) => {
    dados.splice(index,1);
    localStorage.setItem('dados', JSON.stringify(dados));
}

const localizarRegistro = () => {
    return dado;
}

const editarRegistro = (i) => {
    item = dados[i];

    index.value = i;
    descricao.value = item.descricao;
    tipo.value = item.tipo;
    valor.value = item.valor;
    data.value = item.data;
    formaPagamento.value = item.formaPagamento;
    observacao.value = item.observao;

}