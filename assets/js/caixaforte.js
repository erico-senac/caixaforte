const btnSalvar = document.querySelector('#btnSalvar');
const btnCancelar = document.querySelector('#btnCancelar');
const descricao = document.querySelector('[name="descricao"]')
const tipo = document.querySelector('[name="tipo"]')
const valor = document.querySelector('[name="valor"]')
const data = document.querySelector('[name="data"]')
const formaPagamento = document.querySelector('[name="formadepagamento"]')
const observacao = document.querySelector('[name="textareaobservacao"]')

let dados = [];

btnSalvar.addEventListener('click', (e) => {
    e.preventDefault();
    let dado = 
    {
        'descricao' : descricao.value,
        'tipo' : tipo.value,
        'valor' : valor.value,
        'data' : data.value,
        'formaPagamento' : formaPagamento.value,
        'observao' : observacao.value
    }

    dados.push(dado);
    salvarDados(dados);
});
    