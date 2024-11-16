import { API_URL } from '../configuration/appConfiguration.js';

const form = document.getElementById('address-form');
const registerButton = document.getElementById('register-btn');
const inputs = form.querySelectorAll('input');

const initialData = {};
inputs.forEach(input => {
    initialData[input.id] = input.value;
});

async function atualizarUsuarioNoLocalStorage(response) {
    const usuarioAtualizado = await response.json();
    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
}

registerButton.addEventListener('click', async function () {
    inputs.forEach(input => input.disabled = true);

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
        window.location.href = '/Entrega/Listar';
    } else {
        const errorData = await response.json();
        alert('Erro ao cadastrar endereço: ' + errorData.message);
    }
});