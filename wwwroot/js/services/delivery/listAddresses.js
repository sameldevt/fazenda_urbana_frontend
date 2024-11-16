import * as cartManagement from '../cart/cartManagement.js';

let cart = cartManagement.cart;

function calculateTotalPrice() {
    const cartTotal = cartManagement.calculateCartItensTotal();
    const shippingCost = cart['shippingCost'];

    const totalPrice = Number(cartTotal) + Number(shippingCost);

    document.querySelector('.total-price').innerText = `R$ ${totalPrice.toFixed(2)}`;

    cartManagement.calculateFinalTotal();
}

function setShippingCost(card) {
    const cardShippingCost = card.querySelector('span').innerText;
    const shippingCostTag = document.querySelector('.shipping-cost');
    const cartItensPrice = cartManagement.calculateCartItensTotal();

    const shippingCost = cartItensPrice > 50 ? 0 : Number(cardShippingCost); 

    cart['shippingCost'] = Number(shippingCost);

    cartManagement.updateCart(cart);

    shippingCostTag.innerHTML = cartItensPrice > 50 ?
        `
            <p>R$<s>${cardShippingCost}</s> R$ 0,00 </p>
        `
        : shippingCost.toFixed(2);
}

function createAddressCards() {
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user.enderecos || user.enderecos.length === 0) {
        window.location.href = "/Entrega/Endereco";
        return;
    }

    const addressContainer = document.getElementById("addresses-container");
    addressContainer.innerHTML = "";

    user.enderecos.forEach(address => {
        const shippingCost = (Math.random() * 15).toFixed(2);

        const addressCard = document.createElement("div");
        addressCard.classList.add("address-card", "mb-3");

        addressCard.innerHTML = `
                <div class="address-card w-100 shadow-sm mb-3">
                    <div class="card-body col align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="address" id="address${address.id}" value="${address.id}">
                            <div class="d-flex justify-content-between">
                                <label class="form-check-label font-weight-bold" for="endereco${address.id}">
                                    ${address.logradouro}, ${address.numero} 
                                </label>
                                <p>R$ <span id="card-shipping-cost-${address.id}">${shippingCost}</span></p>
                            </div>   
                        </div>
                        <div class="text-muted mt-2">
                            <p class="mb-0">${address.cidade}, ${address.estado}</p>
                        </div>
                        <div class="text-muted mt-2">
                            <p class="mb-0">${address.cep}</p>
                        </div>
                    </div>
                </div>
            `;

        addressContainer.appendChild(addressCard);
    });

    const addressCards = document.querySelectorAll('.address-card');

    addressCards.forEach(card => {
        card.addEventListener('click', () => {
            setShippingCost(card);
            setRadioButton(card);
            calculateTotalPrice();
        });
    });
}

function checkUser() {
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user) {
        window.location.href = "/Cliente/Entrar";
        return;
    }
}

function setRadioButton(card) {
    const addressesCard = document.querySelectorAll('.address-card');

    addressesCard.forEach((card) => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = false;
    });

    const radio = card.querySelector('input[type="radio"]');
    radio.checked = true;
    setShippingCost(card);
    calculateTotalPrice();
}

function selectFirstAddressCard() {
    const firstAddressCard = document.querySelector('.address-card');
    const radio = firstAddressCard.querySelector('input[type="radio"]');
    radio.checked = true;
    setShippingCost(firstAddressCard);
    calculateTotalPrice();
}

function setProductsInfo() {
    const productsQuantity = cart['itens'].length;
    const cartTotalPrice = cartManagement.calculateCartItensTotal();

    document.querySelector('.product-quantity').innerText = productsQuantity;
    document.querySelector('.sub-total').innerText = cartTotalPrice.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
    checkUser();
    createAddressCards();
    selectFirstAddressCard();
    setProductsInfo();
});