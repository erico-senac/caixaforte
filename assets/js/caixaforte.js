const btnSalvar = document.querySelector('#btnSalvar');
const btnCancelar = document.querySelector('#btnCancelar');
const descricao = document.querySelector('[name="descricao"]')
const tipo = document.querySelector('[name="tipo"]')
const valor = document.querySelector('[name="valor"]')
const data = document.querySelector('[name="data"]')
const formaPagamento = document.querySelector('[name="formadepagamento"]')
const observacao = document.querySelector('[name="textareaobservacao"]')

let dados = localStorage.getItem('dados') !== null ? JSON.parse(localStorage.getItem('dados')) : [];

const limpaDestino = () => {
    document.querySelector('#despesa ul').innerHTML = '';
    document.querySelector('#credito ul').innerHTML = '';
}

const inseriDetalhamento = (dados) => {
    limpaDestino();
    dados.forEach(dado => {
        let destino = document.querySelector(`#${(dado.tipo).toLowerCase()} ul`);
        let itemLista = document.createElement('li');
        let apagar = document.createElement('button');
        apagar.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        apagar.addEventListener('click', () => apagarRegistro);
        itemLista.innerText = `${dado.descricao} -> R$ ${dado.valor}`;
        itemLista.appendChild(apagar);
        destino.appendChild(itemLista);
    })
}

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
    inseriDetalhamento(dados);
});
    
inseriDetalhamento(dados);