import { API_URL } from '../configuration/appConfiguration.js';
const contextUrl = `${API_URL}/produto/buscar-todos`

function createProductCard(produto) {
    return `
        <div class="col-md-3 product-container product" data-id="${produto.id}">
            <div class="d-flex justify-content-center mb-2">
                <img src="${produto.imagemUrl}" class="img-fluid product-image" alt="${produto.nome}"
                    onerror="this.onerror=null;this.src='https://picsum.photos/200';">
            </div>
            <div class="justify-content-left mb-2">
                <h5>${produto.nome}</h5>
                <p style="color: green;font-size: 20px">R$ ${produto.precoQuilo.toFixed(2)} /kg</p>
            </div>
        </div>
    `;
}

function loadProducts() {
    fetch(contextUrl) 
        .then(response => response.json())
        .then(produtos => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; 

            produtos.forEach(produto => {
                productList.innerHTML += createProductCard(produto);
            });

            const productContainers = document.querySelectorAll(".product-container");
            productContainers.forEach(product => {
                product.addEventListener("click", function () {
                    const productId = product.getAttribute("data-id");
                    window.location.href = `Detalhes/${productId}`;
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });
}

document.addEventListener("DOMContentLoaded", loadProducts);
