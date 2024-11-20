function createAddressCards() {
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user.enderecos || user.enderecos.length === 0) {
        const addressScreen = document.querySelector('.address-screen');

        addressScreen.innerHTML = `
             <div class="col container my-5 d-flex flex-column align-items-center">
                <h1 class="display-4">Você não possui endereços cadastrados!</h1>
                <button class="btn register-address-button primary-button-color mt-5 w-50">Cadastrar endereço</button>
            </div>
        `;

        document.querySelector('.register-address-button').addEventListener('click', () => {
            window.location.href = "/Cliente/CadastrarEndereco";
        });
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
                            <div class="d-flex justify-content-between">
                                <label class="form-check-label font-weight-bold" for="endereco${address.id}">
                                    ${address.logradouro}, ${address.numero} 
                                </label>
                            </div>   
                        </div>
                        <div class="text-muted mt-2">
                            <p class="mb-0">${address.cidade}, ${address.estado}, ${address.cep}</p>
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
        window.location.href = "/Acesso/Entrar";
        return;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    checkUser();
    createAddressCards();
});