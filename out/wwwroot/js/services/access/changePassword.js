import { API_URL } from '../configuration/appConfiguration.js';

const contextUrl = `${API_URL}/usuario/alterar-senha`;

document.getElementById('reset-password-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("As senhas precisam ser iguais!");
        return;
    }

    try {
        const response = await fetch(contextUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                novaSenha: password
            })
        });

        if (response.ok) {
            alert("Senha alterada com sucesso");
            window.location.href = "/Acesso/Entrar";
        } else if (response.status === 400) {
            alert('Deu pau!');
        }

    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de rede, tente novamente mais tarde.');
    }
});
