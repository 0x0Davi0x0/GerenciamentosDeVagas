const apiURLVagas = 'https://crudcrud.com/api/b55b5fa5036045e7b586662badddbc70/vagas';

// Carregar vagas disponíveis
function carregarVagasDisponiveis() {
    fetch(apiURLVagas)
        .then(response => response.json())
        .then(data => {
            const totalVagas = 50; // Exemplo de total de vagas
            const vagasOcupadas = data.length;
            const vagasDisponiveis = totalVagas - vagasOcupadas;

            document.getElementById('vagasDisponiveis').textContent = 
                `Total de vagas disponíveis: ${vagasDisponiveis}`;
        })
        .catch(error => console.error('Erro ao carregar vagas disponíveis:', error));
}

// Carregar vagas ao iniciar a página
window.onload = carregarVagasDisponiveis;
