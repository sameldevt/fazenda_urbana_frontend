const botoesSelecionar = document.querySelectorAll('.botao-selecionar');

botoesSelecionar.forEach((botao) => {
    botao.addEventListener('click', function () {
        const card = this.closest('.card');
        const paymentMethod = card.querySelector('.card-title').innerText;

        setPaymentMethod(paymentMethod);

        window.location.href="/Pedido/Confirmar"
    });
})

function setPaymentMethod(paymentMethod) {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || {};

    cart['tipoPagamento'] = paymentMethod;

    localStorage.setItem('carrinho', JSON.stringify(cart));
}

