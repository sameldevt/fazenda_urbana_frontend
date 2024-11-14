const cart = JSON.parse(localStorage.getItem('carrinho')) || [];

function checkCart() {
    let cartElement = '';
    cart.forEach(item => {
        let total = calculateTotal(item.precoQuilo, item.quantidade);

        cartElement += `
                <div class="row align-items-center mb-4">
                    <div class="col-4">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${item.imagemUrl}" alt="Imagem de ${item.nome}" class="img-fluid rounded me-3" style="width: 80px; height: 80px;">
                            <div>
                                <h5 class="mb-1">${item.nome}</h5>
                                <p class="mb-1">R$ ${item.precoQuilo.toFixed(2)} / kg</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <p class="fw-bold">Quantidade (kg)</p>
                        <p >${item.quantidade}</p>
                    </div>
                    <div class="col-3">
                        <p class="fw-bold">Valor total</p>
                        <p id="total-${item.id}">R$ ${total.toFixed(2)}</p>
                    </div>
                </div>
            `;
    });

    document.getElementById('cart-items-list').innerHTML = cartElement;
}

function calculateTotal(precoQuilo, quantidade) {
    return precoQuilo * quantidade;
}

function calculateCartTotal() {
    const total = cart.reduce((total, item) => total + item.precoQuilo * item.quantidade, 0);

    document.getElementById('total-price').innerText = `R$ ${total.toFixed(2)}`;
}

function getProductsTotalPrice() {
    const productsPrice = cart.getItem('products-price');

}

function getShippingPrice() {
    const shippingPrice = cart.getItem('shipping-price');
}

document.addEventListener('DOMContentLoaded', function () {
    checkCart();
    calculateCartTotal();
});