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
        let editar = document.createElement('button');
        apagar.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        apagar.addEventListener('click', () => {
            apagarRegistro(dados.indexOf(dado));
            salvarDados(dados);
            inseriDetalhamento(dados);
        });
        editar.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        editar.addEventListener('click', () => {
            editarRegistro(dados.indexOf(dado));
            salvarDados(dados);
            inseriDetalhamento(dados);
        })
        itemLista.innerText = `${dado.descricao} -> R$ ${dado.valor}`;
        itemLista.appendChild(apagar);
        itemLista.appendChild(editar);
        destino.appendChild(itemLista);
    });
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

    salvarDados(dado, );
    inseriDetalhamento(dados);
});
    
inseriDetalhamento(dados);