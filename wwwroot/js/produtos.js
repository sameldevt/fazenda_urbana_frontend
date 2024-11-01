import { API_URL } from './config.js';
const contextUrl = `${API_URL}/produtos/buscar-todos`

function createProductCard(produto) {
    return `
                <div class="col-md-3 product-container product">
                    <div class="d-flex justify-content-center mb-2">
                        <img src="${produto.imagemUrl}" class="img-fluid product-image" alt="${produto.nome}"
                            onerror="this.onerror=null;this.src='https://picsum.photos/200';">
                    </div>
                    <div class="justify-content-left mb-2">
                        <h5>${produto.nome}</h5>
                        <a href="/ProdutoDetalhes/${produto.id}" class="btn btn-link p-0" style="color: grey;">Ver detalhes</a>
                        <p style="color: green;font-size: 20px">R$ ${produto.precoQuilo.toFixed(2)} /kg</p>
                    </div>
                </div>
        `;
}

// Função para buscar os produtos da API
function loadProducts() {
    fetch(contextUrl)  // URL da sua API que retorna a lista de produtos
        .then(response => response.json())
        .then(produtos => {
            const productList = document.getElementById('product-list');
            produtos.forEach(produto => {
                productList.innerHTML += createProductCard(produto);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
        });
}

// Carregar produtos ao carregar a página
document.addEventListener('DOMContentLoaded', loadProducts);