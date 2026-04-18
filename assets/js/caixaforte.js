/**Botões */
const btnSalvar = document.querySelector('#btnSalvar');
const btnCancelar = document.querySelector('#btnCancelar');
/**Dados do formulário */
const index = document.querySelector('[name="index"]')
const descricao = document.querySelector('[name="descricao"]')
const tipo = document.querySelector('[name="tipo"]')
const valor = document.querySelector('[name="valor"]')
const data = document.querySelector('[name="data"]')
const formaPagamento = document.querySelector('[name="formadepagamento"]')
const observacao = document.querySelector('[name="textareaobservacao"]')
const lbl_inputData = document.querySelector('#lbl_inputData');
/**Dados do Resumo */
const totalReceitas = document.querySelector('[name="receitas"]');
const totalDespesas = document.querySelector('[name="despesas"]');
const saldo = document.querySelector('[name="saldo"]');
/**Documento completo */

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
            if(confirm('Deseja realmente apagar a entrada? ')){
                apagarRegistro(dados.indexOf(dado));
                window.location.reload();
            }
        });
        editar.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        editar.addEventListener('click', () => {
            editarRegistro(dados.indexOf(dado));
            if(dado.tipo === 'despesa'){
                lbl_inputData.innerHTML = 'Pagamento';
            } else {
                lbl_inputData.innerHTML = 'Recebimento';
            }
        })
        itemLista.innerText = `${dado.descricao} -> R$ ${dado.valor}`;
        itemLista.appendChild(apagar);
        itemLista.appendChild(editar);
        destino.appendChild(itemLista);
    });
}

const verificaDados = () => {
    let resultado = true;
    if(descricao.value === '' || tipo.value === '' || valor.value  === '' || data.value === '' || formaPagamento.value  === '' )
        resultado = false;
    if(!resultado){
        if(descricao.value === '')
            descricao.classList.add('is-erro');
        if(tipo.value === '')
            tipo.classList.add('is-erro');
        if(valor.value  === '')
            valor.classList.add('is-erro');
        if(data.value === '')
            data.classList.add('is-erro');
        if(formaPagamento.value  === '')
            formaPagamento.classList.add('is-erro');
    }
    return resultado;
}

btnSalvar.addEventListener('click', (e) => {
    e.preventDefault();
    if(verificaDados()){
        let i = index.value === '' ? null : parseInt(index.value);
        let dado = 
        {
            'descricao' : descricao.value,
            'tipo' : tipo.value,
            'valor' : valor.value,
            'data' : data.value,
            'formaPagamento' : formaPagamento.value,
            'observao' : observacao.value
        }

        salvarDados(dado, i);
        window.location.reload();
    } 
});

btnCancelar.addEventListener('click', () => {
    window.location.reload();
})

const atualizaSaldos = (dados) => {
    let tcred = 0.0;
    let tdesp = 0.0;

    dados.forEach( dados => {
        if(dados.tipo === 'credito')
            tcred += parseFloat(dados.valor);
        else
            tdesp += parseFloat(dados.valor);
    })

    totalReceitas.value = `R$ ${tcred}`;
    totalDespesas.value = `R$ ${tdesp}`;
    saldo.value = `R$ ${tcred-tdesp}`;
    if(tcred-tdesp < 0){
        saldo.classList.add('bg-danger')
        saldo.classList.remove('bg-success')
    } else {
        saldo.classList.add('bg-success')
        saldo.classList.remove('bg-danger')
    }
    if(tcred-tdesp == 0){
        saldo.classList.remove('bg-success')
        saldo.classList.remove('bg-danger')
    }
}

document.addEventListener('keydown', (key) => {
    // console.log(key.code)
    if(key.code === 'F8'){
        btnSalvar.click()
    }
    if(key.code.toLowerCase() === 'escape'){
        btnCancelar.click()
    }
})

tipo.addEventListener('change', (e) => {
    if(e.target.value === 'despesa'){
        lbl_inputData.innerHTML = 'Pagamento';
    } else {
        lbl_inputData.innerHTML = 'Recebimento';
    }
})

inseriDetalhamento(dados);
atualizaSaldos(dados);