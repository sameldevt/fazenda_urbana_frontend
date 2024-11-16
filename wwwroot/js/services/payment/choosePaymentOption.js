import * as cartManagement from '../cart/cartManagement.js';

let cart = cartManagement.loadCart();

function calculatePaymentPrice() {
    const finalPricePix = document.querySelector('.total-price-pix');
    const finalPriceBoleto = document.querySelector('.total-price-boleto');

    const cartFinalPrice = parseFloat(cart['finalPrice']);
    const cartShippingPrice = parseFloat(cart['shippingCost']);

    const pixPrice = cartFinalPrice - cartFinalPrice * 0.05;

    finalPricePix.innerHTML = cartFinalPrice > 50 ? (pixPrice - cartShippingPrice).toFixed(2) : pixPrice.toFixed(2);
    finalPriceBoleto.innerHTML = cartFinalPrice > 50 ? (cartFinalPrice - cartShippingPrice).toFixed(2) : cartFinalPrice.toFixed(2);
}

const selectPaymentMethodButtons = document.querySelectorAll('.select-payment-method-button');

selectPaymentMethodButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const card = this.closest('.card');
        const paymentMethod = card.querySelector('.card-title').innerText;

        setPaymentMethod(paymentMethod);

        window.location.href = "/Pedido/Confirmar";
    });
})

function setPaymentMethod(paymentMethod) {
    cart['paymentMethod'] = paymentMethod;

    cartManagement.updateCart(cart);
}


document.addEventListener("DOMContentLoaded", () => {
    if (cart['itens'] === null || cart['itens'].length === 0) {
        window.location.href = "/Carrinho/Listar";
    }
    cartManagement.updateCart(cart);
    calculatePaymentPrice();
});