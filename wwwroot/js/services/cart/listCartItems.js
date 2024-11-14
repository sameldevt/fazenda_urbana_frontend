let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkCart() {
    if (cart.length === 0) {
        document.getElementById('cart-item-list').innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    let cartHtml = '';
    cart.forEach(item => {
        let total = calculateTotal(item.pricePerKilo, item.quantity);

        cartHtml += `
                <div class="row align-items-center mb-4">
                    <div class="col-4">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${item.imageUrl}" alt="Imagem de ${item.name}" class="img-fluid rounded me-3" style="width: 80px; height: 80px;">
                            <div>
                                <h5 class="mb-1">${item.name}</h5>
                                <p class="mb-1">R$ ${item.pricePerKilo.toFixed(2)} / kg</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <p class="fw-bold">Quantidade (kg)</p>
                        <input type="number" class="form-control" value="${item.quantity}" min="0" step="0.1" onchange="updateQuantity(${item.id}, this.value)">
                    </div>
                    <div class="col-3">
                        <p class="fw-bold">Valor total</p>
                        <p id="total-${item.id}">R$ ${total.toFixed(2)}</p>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-outline-secondary w-100 mb-2" onclick="updateQuantity(${item.id}, ${item.quantity})">Alterar</button>
                        <button class="btn btn-outline-danger w-100" onclick="removeFromCart(${item.id})">Excluir</button>
                    </div>
                </div>
            `;
    });

    document.getElementById('cart-item-list').innerHTML = cartHtml;
}

function calculateTotal(pricePerKilo, quantity) {
    return pricePerKilo * quantity;
}

function updateQuantity(itemId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = parseFloat(newQuantity);

        updateCart();

        const total = calculateTotal(cart[itemIndex].pricePerKilo, cart[itemIndex].quantity);
        calculateCartTotal();
        document.getElementById(`total-${itemId}`).innerText = `R$ ${total.toFixed(2)}`;
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    updateCart();

    checkCart();
}

function calculateCartTotal() {
    if (cart.length === 0) {
        document.getElementById('cart-summary').innerHTML = ``;
        return;
    }

    const total = cart.reduce((total, item) => total + item.pricePerKilo * item.quantity, 0);

    document.getElementById('sub-total').innerText = `R$ ${total.toFixed(2)}`;

    return Number(total);
}

document.addEventListener('DOMContentLoaded', function () {
    checkCart();
    calculateCartTotal();
});
