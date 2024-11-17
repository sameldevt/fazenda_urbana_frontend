import { API_URL } from '../configuration/appConfiguration.js';

const contextUrl = `${API_URL}/contato/enviar-mensagem`;

document.getElementById('send-message-button').addEventListener('click', (event) => {
    event.preventDefault();
    sendMessage();
});

function sendMessage() {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const payload = {
        nomeUsuario: `${name} ${lastName}`,
        emailUsuario: email,
        conteudo: message
    };

    fetch(contextUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
        } else {
            return response.json().then((errorData) => {
                let errorMessage = 'Erro ao enviar mensagem.';
                alert(errorMessage);
                console.error('Error sending message:', errorData);
            });
        }
    }).catch((error) => {
        alert('Erro ao tentar enviar a mensagem.');
        console.error('Fetch error:', error);
    });
}
