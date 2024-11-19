import * as cartManagement from '../cart/cartManagement.js';
import { API_URL } from '../configuration/appConfiguration.js';

let cart = cartManagement.loadCart();
const contextUrl = `${API_URL}/pedido/cadastrar`;

const confirmButton = document.querySelector('.confirm-order-button');
document.querySelector('.payment-method').innerText = cart['paymentMethod'];

confirmButton.addEventListener('click', () => {
    confirmOrder();
})

function confirmOrder() {
    const orderDto = {
        clienteId: cart['clientId'],
        total: cart['finalPrice'],
        enderecoEntrega: cart['deliveryAddress']['logradouro'],
        formaPagamento: cart['paymentMethod'],
        itens: cart['itens'].map(item => ({
            produtoId: item.id,
            quantidade: item.quantity,
            subTotal: item.subTotal
        }))
    };

    fetch(contextUrl, {
        method: 'POST',              
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(orderDto) 
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
        }).then(orderDto => {
        window.location.href = '/Pedido/Resumo';
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    localStorage.removeItem('carrinho');
}

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
    const productList = document.querySelector('.order-item-list');

    let cartHtml = '';
    for (const item of cart['itens']) {
        let product = await loadProductDetails(item.id);

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

                <div class="col-3 text-center">
                    <p class="fw-bold">Quantidade (kg)</p>
                    <p>${item.quantity} kg</p>
                </div>
                <div class="col-3">
                    <p class="fw-bold">Valor total</p>
                    <p id="total-${item.id}">R$ ${item.subTotal}</p>
                </div>
            </div>
        `;

        productList.innerHTML = cartHtml;
    }

    document.querySelector('.product-quantity').innerText = cart['itens'].length;

    const cartFinalPrice = cart['finalPrice'];

    document.querySelector('.total-price').innerText = cartFinalPrice.toFixed(2);
}

function setProductsInfo() {
    const productsQuantity = cart['itens'].length;
    const cartTotalPrice = cartManagement.calculateCartItensTotal();

    document.querySelector('.product-quantity').innerText = productsQuantity;
    document.querySelector('.sub-total').innerText = cartTotalPrice.toFixed(2);
}

function setShippingCost() {
    const shippingCost = cart['shippingCost'];
    const cartSubTotal = cartManagement.calculateCartItensTotal();

    document.querySelector('.shipping-cost').innerHTML = cartSubTotal > 50 ?
        `
            <p>R$<s>${shippingCost.toFixed(2)}</s> R$ 0,00 </p>
        `
        : shippingCost.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
    if (cart['itens'] == null || cart['itens'].length === 0) {
        window.location.href = "/Produto/Listar";
    }
    loadProductCards();
    setProductsInfo();
    setShippingCost();
});