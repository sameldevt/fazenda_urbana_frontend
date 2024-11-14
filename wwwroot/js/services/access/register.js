import { API_URL } from './js/services/configuration/appConfiguration.js';
const contextUrl = `${API_URL}/usuario/registrar`;

document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;

    if (!term) {
        alert('Você precisa aceitar os Termos de Serviço e Política de Privacidade.');
        return;
    }

    try {
        const response = await fetch(contextUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                senha: password,
                contato: { telefone: "", email: email }
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Resposta da API:', data);
            window.location.href = '/Cliente/Entrar';
        } else {
            const errorData = await response.json();
            console.error('Erro no cadastro:', errorData);
            alert('Erro no cadastro: ' + errorData);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de rede. Tente novamente mais tarde.');
    }
});
