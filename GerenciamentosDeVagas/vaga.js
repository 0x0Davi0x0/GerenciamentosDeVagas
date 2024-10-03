const apiURL = 'https://crudcrud.com/api/b55b5fa5036045e7b586662badddbc70/vagas';

// Cadastrar vaga
document.getElementById('cadastrarVaga').addEventListener('click', () => {
    const vaga = {
        placa: document.getElementById('placa').value,
        apartamento: document.getElementById('apartamento').value,
        bloco: document.getElementById('bloco').value,
        vaga: document.getElementById('vaga').value
    };

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vaga)
    }).then(response => response.json())
      .then(data => {
          alert('Vaga cadastrada com sucesso!');
          carregarVagas(); // Atualizar a tabela
      })
      .catch(error => console.error('Erro ao cadastrar a vaga:', error));
});

// Carregar vagas cadastradas
function carregarVagas() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector('#tabelaVagas tbody');
            tabela.innerHTML = ''; // Limpar tabela
            data.forEach((vaga, index) => {
                const row = tabela.insertRow();
                row.insertCell(0).textContent = vaga.placa;
                row.insertCell(1).textContent = vaga.apartamento;
                row.insertCell(2).textContent = vaga.bloco;
                row.insertCell(3).textContent = vaga.vaga;

                const acoes = row.insertCell(4);
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.onclick = () => editarVaga(vaga._id);
                acoes.appendChild(editarBtn);

                const removerBtn = document.createElement('button');
                removerBtn.textContent = 'Remover';
                removerBtn.onclick = () => removerVaga(vaga._id);
                acoes.appendChild(removerBtn);
            });
        })
        .catch(error => console.error('Erro ao carregar vagas:', error));
}

// Editar vaga
function editarVaga(id) {
    const novaPlaca = prompt("Nova placa:");
    const novoApartamento = prompt("Novo apartamento:");
    const novoBloco = prompt("Novo bloco:");
    const novaVaga = prompt("Nova vaga:");

    if (novaPlaca && novoApartamento && novoBloco && novaVaga) {
        fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                placa: novaPlaca,
                apartamento: novoApartamento,
                bloco: novoBloco,
                vaga: novaVaga
            })
        }).then(() => carregarVagas());
    }
}

// Remover vaga
function removerVaga(id) {
    if (confirm('Tem certeza que deseja remover essa vaga?')) {
        fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        }).then(() => carregarVagas());
    }
}

// Carregar vagas ao iniciar a página
window.onload = carregarVagas;
