import { API_URL } from "../configuration/appConfiguration.js";

const contextUrl = `${API_URL}/usuario/alterar-senha`

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

const saveButton = document.getElementById('edit-button');
const cancelButton = document.getElementById('cancel-button');

function changePassword() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert("As novas senhas precisam ser iguais!");
        return;
    }

    const payload = {
        email: email,
        novaSenha: password
    };

    fetch(contextUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if(!response.ok) {
            throw new Error('Erro na requisição');
        }
        alert("Senha alterada com sucesso");
        window.location.href = '/Cliente/DadosPessoais';
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

saveButton.addEventListener('click', () => {
    changePassword();
});

cancelButton.addEventListener('click', () => {
    window.location.href = '/Cliente/DadosPessoais';
})