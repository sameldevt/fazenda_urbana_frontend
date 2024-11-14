function loadNavbar() {
    const navbarItems = document.getElementById('navbar-items');
    const usuario = localStorage.getItem('usuario');

    navbarItems.innerHTML = '';

    if (usuario) {
        navbarItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link text-dark" href="/Produto/Listar">Produtos</a>
            </li>
            <li class="nav-item me-2">
                <a class="nav-link text-dark" href="/Cliente/Contato">Contato</a>
            </li>                        
            <li class="nav-item me-2">
                <a class="nav-link text-dark" href="/Cliente/Pedidos">Meus pedidos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark" href="/Carrinho/Listar">Meu carrinho</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark" href="/Cliente/Perfil">Minha conta</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light btn btn-dark px-3" href="#" onclick="logout()">Sair</a>
            </li>
        `;
    } else {
        navbarItems.innerHTML = `
            <li class="nav-item">
                <a class="nav-link text-dark" href="/Produto/Listar">Produtos</a>
            </li>
            <li class="nav-item me-2">
                <a class="nav-link text-dark" href="/Cliente/Contato">Contato</a>
            </li>                        
            <li class="nav-item me-2">
                <a class="nav-link text-dark" href="/Sobre">Sobre</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark px-3" href="/Acesso/Cadastro">Cadastre-se</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-light btn btn-dark px-3" href="/Acesso/Entrar">Entrar</a>
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
