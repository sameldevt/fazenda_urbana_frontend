import { API_URL } from './config.js';
const contextUrl = `${API_URL}/usuario/entrar`
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch(contextUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        if (response.ok) {
            const data = await response.json();
            // Manipule a resposta bem-sucedida (por exemplo, redirecione o usuário)
            console.log('Login bem-sucedido:', data);
            window.location.href = '/'; // Exemplo de redirecionamento
        } else {
            // Manipule erros (como credenciais incorretas)
            const errorData = await response.json();
            console.error('Erro no login:', errorData);
            alert('Erro no login: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de rede, tente novamente mais tarde.');
    }
});
