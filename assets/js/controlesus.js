const versoes = document.querySelector('#versoes');
const URL = 'https://ericocosta.com.br/esus/assets/js/data/versions.json'

async function getVersoes(){
    await fetch(URL)
    .then(resposta => {
        if(!resposta.ok)
            throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`); 
        
        return resposta.json();
    })
    .then(versoesEsus => {
        let tamanho = versoesEsus.length;

        console.log(versoesEsus, tamanho);
    });
};

getVersoes();