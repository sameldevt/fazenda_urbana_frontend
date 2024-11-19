import { API_URL } from '../configuration/appConfiguration.js';
import * as cartManagement from '../cart/cartManagement.js';

let cart = cartManagement.cart;
let cartProduct;

function openModal() {
    const product = cart['itens'].find(item => item.id === cartProduct.id);

    document.getElementById('added-to-cart-modal-label').innerText = `Item adicionado!`;
    document.getElementById('added-to-cart-modal-body').innerText = `O produto ${cartProduct.nome} foi adicionado ao seu carrinho com sucesso!`;

    const modalBody = document.querySelector('#added-to-cart-modal .modal-body');
    modalBody.innerHTML += `
            <div class="container w-75 justify-content-center">
                <img src="${cartProduct.imagemUrl}" alt="${cartProduct.nome}" class="img-thumbnail">
            </div>
            <p><strong>Preço: </strong> R$ ${product.subTotal}</p>
        `;

    $('#added-to-cart-modal').modal('show');
}

function calculateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const pricePerKg = cartProduct.precoQuilo;
    const totalPrice = (quantity * pricePerKg).toFixed(2);
    document.getElementById('product-price').innerText = `R$ ${totalPrice}`;

    return Number(totalPrice);
}

function loadProductDetails(productId) {
    const contextUrl = `${API_URL}/produto/buscar/${productId}`;

    fetch(contextUrl)
        .then(response => response.json())
        .then(product => {
            cartProduct = product;
            document.getElementById('product-image').src = product.imagemUrl;
            document.getElementById('product-name').innerText = product.nome;
            document.getElementById('product-description').innerText = product.descricao;
            document.getElementById('product-price').innerText = `R$ ${product.precoQuilo.toFixed(2)}`;

            const addToCartButton = document.getElementById('add-to-cart-btn');
            addToCartButton.addEventListener('click', function () {
                const quantity = parseFloat(document.getElementById('quantity').value) || 0;
                addToCart(product, quantity);
                openModal(product);
            });     
            
            const buyNowButton = document.getElementById('buy-now-button');

            buyNowButton.addEventListener('click', function () {
                const quantity = parseFloat(document.getElementById('quantity').value) || 0;
                addToCart(product, quantity);
                window.location.href = "/Entrega/Listar";
            });
        })
        .catch(error => console.error('Erro ao carregar os detalhes do produto:', error));
}

function loadRelatedProducts() {
    const relatedUrl = `${API_URL}/produto/buscar-todos`;

    fetch(relatedUrl)
        .then(response => response.json())
        .then(products => {
            const relatedProductsContainer = document.getElementById('related-products');
            relatedProductsContainer.innerHTML = '';

            for (let i = 0; i < products.length; i += 3) {
                const slideItems = products.slice(i, i + 3);
                const activeClass = i === 0 ? 'active' : '';

                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${activeClass}`;

                const itemContainer = document.createElement('div');
                itemContainer.className = 'row d-flex justify-content-center';

                slideItems.forEach(product => {
                    const productContainer = document.createElement('div');
                    productContainer.className = 'col-md-3 product-container product';
                    productContainer.dataset.id = product.id;

                    productContainer.innerHTML = `
                        <div class="d-flex justify-content-center mb-2">
                            <img src="${product.imagemUrl}" class="img-fluid product-image" alt="${product.nome}"
                                onerror="this.onerror=null;this.src='https://picsum.photos/200';">
                        </div>
                        <div class="justify-content-left mb-2">
                            <h5>${product.nome}</h5>
                            <p style="color: green; font-size: 20px">R$ ${product.precoQuilo.toFixed(2)} /kg</p>
                        </div>
                    `;
                    productContainer.addEventListener("click", function () {
                        window.location.href = `${product.id}`;
                    });

                    itemContainer.appendChild(productContainer);
                });

                carouselItem.appendChild(itemContainer);
                relatedProductsContainer.appendChild(carouselItem);
            }
        })
        .catch(error => console.error('Erro ao carregar os produtos relacionados:', error));
}   

function addToCart(product, productQuantity) {
    const cartProduct = cart['itens'].find(item => item.id === product.id);

    if (cartProduct) {
        cartProduct.quantity = productQuantity;
        cart['itens'].push(cartProduct);
    } else {
        const newProduct = {
            id: product.id,
            quantity: productQuantity,
            basePrice: product.precoQuilo,
            subTotal: calculateTotal(),
        }
        cart['itens'].push(newProduct);
    }

    localStorage.setItem('carrinho', JSON.stringify(cart));
}

document.getElementById('quantity').addEventListener('change', function () {
    calculateTotal();
})

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