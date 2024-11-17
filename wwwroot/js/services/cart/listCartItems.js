import * as cartManagement from './cartManagement.js';
import { API_URL } from '../configuration/appConfiguration.js';

let cart = cartManagement.cart;

function loadProductDetails(productId) {
    const contextUrl = `${API_URL}/produto/buscar/${productId}`;

    return fetch(contextUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do produto');
            }
            return response.json();
        })
        .then(product => {
            return product;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
async function loadProductCards() {
    if (cart['itens'] == null || cart['itens'].length === 0) {
        document.querySelector('.cart-title').innerHTML = ``;
        document.querySelector('.cart-items-section').innerHTML = `
        <div class="col container my-5 d-flex flex-column align-items-center">
            <h1 class="display-4">Seu carrinho está vazio!</h1>
            <p class="lead">Que tal descobrir novos produtos?</p>
            <button class="btn primary-button-color mt-5 mb-2 w-50" onclick="window.location.href='/Produto/Listar'">Buscar produtos</button>
        </div>
        `;
        document.querySelector('.cart-summary').innerHTML = ``;
        return;
    }

    let cartHtml = ``;
    for (const item of cart['itens']) {
        const product = await loadProductDetails(item.id);
        cartHtml += `
            <div class="row align-items-center mb-4" id="cart-item-${item.id}">
                <div class="col-4">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${product.imagemUrl}" alt="Imagem de ${product.nome}" class="img-fluid rounded me-3" style="width: 80px; height: 80px;">
                        <div>
                            <h5 class="mb-1">${product.nome}</h5>
                            <p class="mb-1">R$ ${item.basePrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div class="col-3">
                    <p class="fw-bold">Quantidade (kg)</p>
                    <input id="update-item-${item.id}" type="number" class="form-control" value="${item.quantity}" min="0" step="0.1">
                </div>
                <div class="col-3">
                    <p class="fw-bold">Valor total</p>
                    <p id="total-${item.id}">R$ ${(item.subTotal.toFixed(2))}</p>
                </div>
                <div class="col-2">
                    <button id="delete-item-${item.id}" class="btn btn-outline-danger w-100">Excluir</button>
                </div>
            </div>
        `;
    }

    document.getElementById('cart-item-list').innerHTML = cartHtml;

    cart['itens'].forEach(item => {
        const updateButton = document.getElementById(`update-item-${item.id}`);
        if (updateButton) {
            updateButton.addEventListener('change', () => {
                const input = document.getElementById(`update-item-${item.id}`);
                cartManagement.updateItemQuantity(item.id, input.value);
            });
        }
        const deleteButton = document.getElementById(`delete-item-${item.id}`);
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                cartManagement.removeFromCart(item.id);
                document.getElementById(`cart-item-${item.id}`).innerHTML = ``;
            })
        }
    });

    const cartItensTotal = cartManagement.calculateCartItensTotal();

    document.querySelector('.product-quantity').innerText = cart['itens'].length;
    document.querySelector('.total-price').innerText = cartItensTotal.toFixed(2);    
}

document.addEventListener('DOMContentLoaded', function () {
    loadProductCards();
});
