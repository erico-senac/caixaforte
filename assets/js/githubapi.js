// Função assíncrona para buscar os repositórios do GitHub
async function buscarRepositorios(usuario) {
    const url = `https://api.github.com/users/${usuario}/repos`;

        // Faz a requisição para a API do GitHub
        await fetch(url)
        .then( resposta => {

            // Verifica se a requisição foi bem-sucedida (status 200-299)
            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
            }
            // Converte a resposta para JSON
            return resposta.json();
        })
        .then( repositorios => {
            
            // Exibe os resultados no console
            lista.innerHTML += `=== Repositórios Públicos de: ${usuario} === <br>`;
            
        if (repositorios.length === 0) {
             lista.innerHTML += "Nenhum repositório público encontrado. <br>";
            return;
        }

        repositorios.forEach(repo => {
            lista.innerHTML += `📌 Nome: ${repo.name} <br>`;
            lista.innerHTML += `🔗 URL: ${repo.html_url} <br>`;
            lista.innerHTML += `⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count} <br>`;
            lista.innerHTML += `📝 Descrição: ${repo.description || 'Sem descrição'} <br>`;
            lista.innerHTML += '-------------------------------------------------- <br>';
        });
    })
    .catch(erro => {
    console.error(`Não foi possível obter os repositórios: ${erro.message}`);
    });
}

// Executa a função utilizando o seu usuário
const lista = document.querySelector("#listagem");
const usuario = document.querySelector('input');

usuario.addEventListener('blur', e => {
    lista.innerHTML = '';
    buscarRepositorios(e.target.value);
})
