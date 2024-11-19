class Cart {
    constructor(clientId, finalPrice, deliveryAddress, paymentMethod, itens) {
        this.clientId = clientId;
        this.finalPrice = finalPrice;
        this.deliveryAddress = deliveryAddress;
        this.paymentMethod = paymentMethod;
        this.itens = itens;
    }
}