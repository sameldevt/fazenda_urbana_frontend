import { API_URL } from "../configuration/appConfiguration.js";

const contextUrl = `${API_URL}/usuario/buscar-pedidos`

function getOrders() {
    const user = JSON.parse(localStorage.getItem('usuario'));
    const userId = user['id'];

    fetch(`${contextUrl}?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(orders => orders.json())
        .then(orders => {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ``;
        orders.forEach(order => {
            tableBody.innerHTML += createOrderRow(order);
        });
    })
    .catch(error => {
        const orderListPage = document.querySelector('.order-list');
        orderListPage.innerHTML = `
        <div class="col container my-5 d-flex flex-column align-items-center">
            <h1 class="display-4">Você não possui pedidos!</h1>
            <p class="lead">Que tal dar uma olhada em nosso catálogo?</p>
            <button class="btn search-products-button primary-button-color mt-5 w-50">Buscar produtos</button>
        </div>
        `;

        document.querySelector('.search-products-button').addEventListener('click', () => {
            window.location.href = "/Produto/Listar";
        });
    });
}

function createOrderRow(order) {
    return `
     <tr id="row-${order.id}">
        <td>${String(order.id).padStart(8, '0')}</td>
        <td>${formatDate(order.dataPedido)}</td>
        <td>${order.status}</td>
        <td>R$ <span>${order.total}</span></td>
    </tr>
    `;
}

function formatDate(inputDate) {
    let date = new Date(inputDate);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
}


document.addEventListener('DOMContentLoaded', () => {
    getOrders();
});