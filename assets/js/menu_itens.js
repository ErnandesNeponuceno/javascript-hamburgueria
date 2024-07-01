function createProductCard(product) {
    return `
        <div class="flex gap-2">
            <img 
                src="${product.img}" 
                alt="${product.alt}"
                class="w-28 h-28 rounded-md hover:scale-110 hover:rotate-2 duration-300">
            <div class="w-full">
                <p class="font-bold">${product.nome}</p>
                <p class="text-sm">${product.descricao}</p>
                <div class="flex items-center gap-2 justify-between mt-3">
                    <p>R$ ${product.preco}</p>
                    <button class="bg-gray-900 px-3 py-1 rounded add-to-cart-btn"
                        data-name="${product.nome}"
                        data-price="${product.preco}"
                        title="adicionar">
                        <i class="fa fa-cart-plus text-lg text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Função para renderizar os cards de produtos
function renderProductCards(containerId, products) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpa o container

    const productCards = products.map(createProductCard).join('');
    container.innerHTML = productCards;
}

// Função para carregar os dados dos produtos a partir de um arquivo JSON
function loadProductData() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            renderProductCards('burgers-container', data.burgers);
            renderProductCards('snacks-container', data.snacks);
            renderProductCards('bebidas-container', data.bebidas);
        })
        .catch(error => console.error('Erro ao carregar os dados dos produtos:', error));
}

document.addEventListener('DOMContentLoaded', loadProductData);
