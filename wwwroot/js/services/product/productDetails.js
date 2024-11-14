import { API_URL } from '../configuration/appConfiguration.js';

let cart = JSON.parse(localStorage.getItem('carrinho')) || [];

function addToCart(p) {
    const product = cart.find(item => item.id === p.id);

    alert(product.quantidadeEstoque);
    if (product) {
        product.quantidadeEstoque++;
    } else {
        product.quantidadeEstoque = 1;
        cart.push(product);
    }

    localStorage.setItem('carrinho', JSON.stringify(cart));
}

function openModal(produto) {
    document.getElementById('added-to-cart-modal-label').innerText = `Item adicionado: ${produto.nome}`;
    document.getElementById('added-to-cart-modal-body').innerText = `O produto ${produto.nome} foi adicionado ao seu carrinho com sucesso!`;

    const modalBody = document.querySelector('#added-to-cart-modal .modal-body');
    modalBody.innerHTML += `
            <div>
                <img src="${produto.imagemUrl}" alt="${produto.nome}" class="img-fluid">
                <p><strong>Preço: </strong> R$ ${produto.precoQuilo.toFixed(2)} / kg</p>
            </div>
        `;

    $('#added-to-cart-modal').modal('show');
}

function calculateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const pricePerKg = parseFloat(document.getElementById('product-price').innerText.replace('R$ ', '').replace('/ kg', '')) || 0;
    const totalPrice = (quantity * pricePerKg).toFixed(2);
    document.getElementById('total-price').innerText = totalPrice;
}

function loadProductDetails(productId) {
    const contextUrl = `${API_URL}/produto/buscar/${productId}`;

    fetch(contextUrl)
        .then(response => response.json())
        .then(product => {
            document.getElementById('product-image').src = product.imagemUrl;
            document.getElementById('product-name').innerText = product.nome;
            document.getElementById('product-description').innerText = product.descricao;
            document.getElementById('product-price').innerText = `R$ ${product.precoQuilo.toFixed(2)} / kg`;

            if (product.quantidadeEstoque == 0) {
                document.getElementById('buttons').innerHTML = `
                        <div class="buttons">
                            <p style="color: red">Ops! Produto indisponível no momento. :(</p>
                            <button class="btn btn-secondary mb-2 w-100">Avise-me quando estiver disponível</button> 
                        </div>
                    `;
            } else {
                document.getElementById('buttons').innerHTML = `
                        <div class="botoes">
                            <button class="btn btn-primary mb-2 w-100">Comprar</button>
                            <button class="btn btn-secondary mb-2 w-100" id="add-to-cart-btn">Adicionar ao carrinho</button>
                        </div>
                    `;

                const addToCartButton = document.getElementById('add-to-cart-btn');
                addToCartButton.addEventListener('click', function () {
                    addToCart(product);
                    openModal(product);
                });
            }

            calculateTotal();
        })
        .catch(error => console.error('Erro ao carregar os detalhes do produto:', error));
}

function loadRelatedProducts() {
    const relatedUrl = `${API_URL}/produto/buscar-todos`;

    fetch(relatedUrl)
        .then(response => response.json())
        .then(products => {
            const relatedProductsContainer = document.getElementById('related-products');
            products.forEach((product, index) => {
                const activeClass = index === 0 ? 'active' : '';
                relatedProductsContainer.innerHTML += `
                        <div class="carousel-item ${activeClass}">
                            <div class="d-flex justify-content-center">
                                <img src="${product.imagemUrl}" class="img-fluid rounded" alt="${product.nome}" style="width: 150px; height: auto;" onerror="this.onerror=null;this.src='https://picsum.photos/150';">
                            </div>
                            <div class="text-center mt-2">
                                <p>${product.nome}</p>
                                <p><small>R$ ${product.precoQuilo.toFixed(2)} / ${product.unidade}</small></p>
                                <a href="/ProdutoDetalhes/${product.id}" class="btn btn-link">Ver detalhes</a>
                            </div>
                        </div>
                    `;
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos relacionados:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductId();

    loadProductDetails(productId);
    loadRelatedProducts(productId);
});


function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('productId');

    if (!productId) {
        const pathParts = window.location.pathname.split('/');
        productId = pathParts[pathParts.length - 1];
    }

    return productId;
}