let cart = JSON.parse(localStorage.getItem('carrinho')) || [];

function updateCart() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
}

function checkCart() {
    if (cart.length === 0) {
        document.getElementById('listaItensCarrinho').innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }
}

function calculateTotal(weightPrice, quantity) {
    return weightPrice * quantity;
}


function calculateCartTotal() {
    if (cart.length === 0) {
        document.getElementById('cart-summary').innerHTML = ``;
        return;
    }

    const total = cart.reduce((total, item) => total + item.precoQuilo * item.quantidade, 0);

    document.getElementById('sub-total').innerText = `R$ ${total.toFixed(2)}`;

    return Number(total);
}

function calculateTotalPrice() {
    const total = calculateCartTotal();
    const shippingCost = getShippingCost();
    const totalPrice = Number(total) + Number(shippingCost);

    document.getElementById('total-price').innerText = `R$ ${totalPrice.toFixed(2)}`;
}

function getShippingCost() {
    const card = document.querySelector('.address-card');
    const frete = card.querySelector('#frete').innerText;
    return frete;
}

function setShippingCost(card) {
    const frete = card.querySelector('#frete').innerText;

    const freteElement = document.getElementById('valor-do-frete');

    cart['shippingCost'] = frete;

    updateCart();

    freteElement.innerText = frete;
}

function createAddressCards() {
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user || !user.enderecos || user.enderecos.length === 0) {
        window.location.href = "/Entrega/Endereco";
        return;
    }

    const container = document.getElementById("enderecos-container");
    container.innerHTML = "";

    user.enderecos.forEach(endereco => {
        const frete = (Math.random() * (30 - 10) + 10).toFixed(2);

        const card = document.createElement("div");
        card.classList.add("address-card", "mb-3");

        card.innerHTML = `
                <div class="address-card w-100 shadow-sm mb-3">
                    <div class="card-body">
                        <div class="form-check ">
                            <input class="form-check-input" type="radio" name="endereco" id="endereco${endereco.id}" value="${endereco.id}">
                            <label class="form-check-label font-weight-bold" for="endereco${endereco.id}">
                                ${endereco.logradouro}, ${endereco.numero} 
                            </label>
                            <p>R$ <span id="frete">${frete}</span></p>
                        </div>
                        <div class="text-muted mt-2">
                            <p class="mb-0">${endereco.cidade}, ${endereco.estado}</p>
                        </div>
                        <div class="text-muted mt-2">
                            <p class="mb-0">${endereco.cep}</p>
                        </div>
                    </div>
                </div>
            `;

        container.appendChild(card);
    });

    const cards = document.querySelectorAll('.address-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            setShippingCost(card);
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

document.addEventListener('DOMContentLoaded', function () {
    checkUser();
    checkCart();
    createAddressCards();
    calculateTotalPrice();

    const firstAddressCard = document.querySelector('.address-card');
    const radio = firstAddressCard.querySelector('input[type="radio"]');
    radio.checked = true;
    setShippingCost(firstAddressCard);
});