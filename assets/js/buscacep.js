const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const uf = document.querySelector('#uf');
const ibge = document.querySelector('#ibge');
const complemento = document.querySelector('#complemento');

const limpa_formulario_cep = () => {
    //Limpa valores do formulário de cep.
    rua.value="";
    bairro.value="";
    cidade.value="";
    complemento.value="";
    uf.value="";
    ibge.value="";
}

cep.addEventListener('blur', (e) => {
//Nova variável "cep" somente com dígitos.
    let cepValor = e.target.value.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cepValor != "") {

        //Expressão regular para validar o CEP.
        let validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cepValor)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            rua.value="...";
            complemento.value="..."
            bairro.value="...";
            cidade.value="...";
            uf.value="...";
            ibge.value="...";

            fetch(`https://viacep.com.br/ws/${cepValor}/json`)
            .then((resposta => {
                if(!resposta.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                return resposta.json();
            }))
            .then((conteudo) => {
                if (!("erro" in conteudo)) {
                    //Atualiza os campos com os valores.
                    rua.value=(conteudo.logradouro);
                    complemento.value=(conteudo.complemento);
                    bairro.value=(conteudo.bairro);
                    cidade.value=(conteudo.localidade);
                    uf.value=(conteudo.uf);
                    ibge.value=(conteudo.ibge);
                } //end if.
                else {
                    //CEP não Encontrado.
                    limpa_formulario_cep();
                    alert("CEP não encontrado.");
                }
            })
            .catch((e) => {
                alert(`Ocorreu o erro: ${e}`)
            })
        } //end if.
        else {
            //cep é inválido.
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulario_cep();
    }
});