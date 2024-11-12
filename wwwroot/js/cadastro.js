import { API_URL } from './config.js';
const contextUrl = `${API_URL}/usuario/registrar`;

document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const nomeCompleto = document.getElementById('nome-completo').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;

    if (!termos) {
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
                nome: nomeCompleto,
                senha: senha,
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
        // Erros de rede ou outras falhas
        console.error('Erro de rede:', error);
        alert('Erro de rede. Tente novamente mais tarde.');
    }
});