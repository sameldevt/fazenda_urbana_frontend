function loadNavbar() {
    const navbarItems = document.getElementById('navbar-items');
    const usuario = localStorage.getItem('usuario');

    navbarItems.innerHTML = '';

    if (usuario) {
        navbarItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link text-white" href="/Produto/Listar">Produtos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="/Contato/EnviarMensagem">Contato</a>
            </li>                        
            <li class="nav-item">
                <a class="nav-link text-white" href="/Pedido/Listar">Meus pedidos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="/Carrinho/Listar">Carrinho</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="/Cliente/Perfil">Minha conta</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#" onclick="logout()">Sair</a>
            </li>
        `;
    } else {
        navbarItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link text-white" href="/Produto/Listar">Produtos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="/Contato/EnviarMensagem">Contato</a>
            </li>                        
            <li class="nav-item">
                <a class="nav-link text-white" href="/Sobre">Sobre</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="/Acesso/Cadastro">Cadastre-se</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="/Acesso/Entrar">Entrar</a>
            </li>
        `;
    }
}

function logout() {
    localStorage.removeItem('usuario');
    loadNavbar();
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', loadNavbar);
