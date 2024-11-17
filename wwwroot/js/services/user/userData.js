import { API_URL } from '../configuration/appConfiguration.js';

const contextUrl = `${API_URL}/cliente/atualizar`
const user = JSON.parse(localStorage.getItem('usuario'));

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const editButton = document.getElementById('edit-button');
const changePasswordButton = document.getElementById('change-password-button');

function loadUserInfo() {
    nameInput.value = user['nome'];
    emailInput.value = user['contato']['email'];
    phoneInput.value = user['contato']['telefone'];
}

async function changeUserData() {
    user['nome'] = nameInput.value;
    user['contato']['email'] = emailInput.value;
    user['contato']['telefone'] = phoneInput.value;

    fetch(contextUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            localStorage.setItem('usuario', user);
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

editButton.addEventListener('click', () => {
    if (editButton.innerText === "Editar") {
        nameInput.removeAttribute("disabled");
        emailInput.removeAttribute("disabled");
        phoneInput.removeAttribute("disabled");

        editButton.innerText = "Salvar";
    } else {
        nameInput.setAttribute("disabled", "true");
        emailInput.setAttribute("disabled", "true");
        phoneInput.setAttribute("disabled", "true");

        changeUserData();

        editButton.innerText = "Editar";
    }
});

changePasswordButton.addEventListener('click', () => {
    window.location.href = "/Cliente/AlterarSenha";
});

document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
});
