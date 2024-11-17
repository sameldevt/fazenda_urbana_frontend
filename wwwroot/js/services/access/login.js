import { API_URL } from '../configuration/appConfiguration.js';

const contextUrl = `${API_URL}/usuario/entrar`

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(contextUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('usuario', JSON.stringify(data));
            window.location.href = '/';
        } else if (response.status === 400) {
            alert('Senha inválida!');
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de rede, tente novamente mais tarde.');
    }
});
