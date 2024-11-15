
let cart = loadCart();
export function loadCart() {
    let cart = JSON.parse(localStorage.getItem('carrinho')) || null;

    if (cart === null) {
        const user = JSON.parse(localStorage.getItem('usuario')) || null;

        const address = {
            street: "",
            number: "",
            city: "",
            zipCode: "",
            complement: "",
            state: ""
        };

        const userAddress = user && user.enderecos && user.enderecos.length > 0 ? user.enderecos[0] : address;

        cart = {
            clientId: user === null ? 0 : user.id,
            finalPrice: 0.0,
            deliveryAddress: userAddress,
            paymentMethod: "",
            itens: []
        };

        localStorage.setItem("carrinho", JSON.stringify(cart));
        return cart;  
    }

    return cart; 
}

export function calculateCartTotal() {
    if (cart['itens'] == null || cart['itens'].length === 0) {
        document.getElementById('cart-summary').innerHTML = ``;
        return;
    }

    const total = cart['itens'].reduce((total, item) => total + item.subTotal, 0);

    document.getElementById('total-price').innerText = `R$ ${total}`;

    return total;
}

export function removeFromCart(productId) {
    cart['itens'] = cart['itens'].filter(item => item.id !== productId);
    updateCart(cart);
    loadCart();
}

export function updateItemQuantity(itemId, newQuantity) {
    const itemIndex = cart['itens'].findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart['itens'][itemIndex].subTotal = cart['itens'][itemIndex].basePrice * newQuantity;
        cart['itens'][itemIndex].quantity = parseFloat(newQuantity);

        const total = cart['itens'][itemIndex].basePrice * cart['itens'][itemIndex].quantity;
        document.getElementById(`total-${itemId}`).innerText = `R$ ${total}`;

        calculateCartTotal();
        updateCart(cart);
    }
}

export function updateCart(cart) {
    localStorage.setItem('carrinho', JSON.stringify(cart));
}