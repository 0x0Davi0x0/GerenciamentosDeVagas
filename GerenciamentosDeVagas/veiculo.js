const apiURLVeiculos = 'https://crudcrud.com/api/b55b5fa5036045e7b586662badddbc70/veiculos';

// Cadastrar veículo
document.getElementById('cadastrarVeiculo').addEventListener('click', () => {
    const veiculo = {
        placa: document.getElementById('placaVeiculo').value,
        proprietario: document.getElementById('proprietario').value,
        modelo: document.getElementById('modelo').value,
        cor: document.getElementById('cor').value
    };

    fetch(apiURLVeiculos, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(veiculo)
    }).then(response => response.json())
      .then(data => {
          alert('Veículo cadastrado com sucesso!');
          carregarVeiculos(); // Atualizar a tabela
      })
      .catch(error => console.error('Erro ao cadastrar o veículo:', error));
});

// Carregar veículos cadastrados
function carregarVeiculos() {
    fetch(apiURLVeiculos)
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector('#tabelaVeiculos tbody');
            tabela.innerHTML = ''; // Limpar tabela
            data.forEach((veiculo, index) => {
                const row = tabela.insertRow();
                row.insertCell(0).textContent = veiculo.placa;
                row.insertCell(1).textContent = veiculo.proprietario;
                row.insertCell(2).textContent = veiculo.modelo;
                row.insertCell(3).textContent = veiculo.cor;

                const acoes = row.insertCell(4);
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.onclick = () => editarVeiculo(veiculo._id);
                acoes.appendChild(editarBtn);

                const removerBtn = document.createElement('button');
                removerBtn.textContent = 'Remover';
                removerBtn.onclick = () => removerVeiculo(veiculo._id);
                acoes.appendChild(removerBtn);
            });
        })
        .catch(error => console.error('Erro ao carregar veículos:', error));
}

// Editar veículo
function editarVeiculo(id) {
    const novaPlaca = prompt("Nova placa:");
    const novoProprietario = prompt("Novo proprietário:");
    const novoModelo = prompt("Novo modelo:");
    const novaCor = prompt("Nova cor:");

    if (novaPlaca && novoProprietario && novoModelo && novaCor) {
        fetch(`${apiURLVeiculos}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                placa: novaPlaca,
                proprietario: novoProprietario,
                modelo: novoModelo,
                cor: novaCor
            })
        }).then(() => carregarVeiculos());
    }
}

// Remover veículo
function removerVeiculo(id) {
    if (confirm('Tem certeza que deseja remover este veículo?')) {
        fetch(`${apiURLVeiculos}/${id}`, {
            method: 'DELETE'
        }).then(() => carregarVeiculos());
    }
}

// Carregar veículos ao iniciar a página
window.onload = carregarVeiculos;
