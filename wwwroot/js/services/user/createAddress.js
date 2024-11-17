import { API_URL } from '../configuration/appConfiguration.js';

const registerButton = document.getElementById('register-btn');

registerButton.addEventListener('click', () => {
    createAddress();
})
async function createAddress() {
    const user = JSON.parse(localStorage.getItem('usuario'));
    if (!user || !user.contato.email) {
        alert("Usuário não encontrado.");
        return;
    }

    const enderecoDto = {
        email: user.contato.email,
        logradouro: document.getElementById('street').value,
        numero: document.getElementById('number').value,
        complemento: document.getElementById('complement').value,
        cep: document.getElementById('zipCode').value,
        cidade: document.getElementById('city').value,
        estado: document.getElementById('state').value
    };

    const response = await fetch(`${API_URL}/usuario/cadastrar-endereco`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enderecoDto)
    });

    if (response.ok) {
        alert('Endereço cadastrado com sucesso!');
        await atualizarUsuarioNoLocalStorage(response);
        window.location.href = '/Cliente/Enderecos';
    } else {
        const errorData = await response.json();
        alert('Erro ao cadastrar endereço: ' + errorData.message);
    }
}

async function atualizarUsuarioNoLocalStorage(response) {
    const usuarioAtualizado = await response.json();
    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
}
