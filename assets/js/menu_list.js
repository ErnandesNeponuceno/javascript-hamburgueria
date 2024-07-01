// Função para verificar se um elemento está visível na tela
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adiciona um event listener para cada item do menu
document.querySelectorAll('.atalho_menu').forEach(item => {
    item.addEventListener('click', () => {
        // Remove a classe 'active' de todos os itens
        document.querySelectorAll('.atalho_menu').forEach(menuItem => {
            menuItem.classList.remove('active');
        });
        // Adiciona a classe 'active' apenas ao item clicado
        item.classList.add('active');
    });
});

// Verifica se o item está na tela e adiciona a classe 'active' quando necessário
window.addEventListener('scroll', () => {
    document.querySelectorAll('.atalho_menu').forEach(item => {
        const targetId = item.getAttribute('data-target');
        const target = document.getElementById(targetId);
        
        if (target && isElementVisible(target)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
