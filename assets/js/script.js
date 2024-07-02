const menus = document.querySelectorAll(".menu");
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkOutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const nameInput = document.getElementById("nome_completo")
const nameWarn = document.getElementById("name-warn")

let cart = [];

//abrir o modal
cartBtn.addEventListener("click", function(){
    cartModal.style.display = "flex"
    updateCartModal();
})
//fechar modal
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

// Adiciona um event listener a cada elemento com a classe "menu"
//Aqui o forEach percorre por todos o elementos com classes menu
menus.forEach(menu => {
    menu.addEventListener("click", function(event) {
        let parentButton = event.target.closest(".add-to-cart-btn");
        if (parentButton) {
            const name = parentButton.getAttribute("data-name");
            const price = parseFloat(parentButton.getAttribute("data-price"));
            addToCart(name, price);
        }
    });
});

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        existingItem.quantity += 1;  
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal();
  
}

function updateCartModal(){
    cartItemsContainer.innerHTML= "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add('flex','justify-between', 'mb-2', 'flex-col');

        cartItemElement.innerHTML = `
         <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p> Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
         </div>
        `
        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"

    })
    cartCounter.innerHTML = cart.length;
}

//// função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

//função para alerta de endereço não preenchido
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

//função para alerta de nome não preenchido
nameInput.addEventListener("input", function(event){
    let inputValueName = event.target.value;

    if(inputValueName !== ""){
        nameInput.classList.remove("border-red-500")
        nameWarn.classList.add("hidden")
    }
})

checkOutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        Toastify({
            text: "O restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, 
            style: {
              background: "#ef4444",
            },
          }).showToast();
          return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }
    if(nameInput.value === ""){
        nameWarn.classList.remove("hidden")
        nameInput.classList.add("border-red-500")
        return;
    }

    //enviando o pedido para a api do whatsapp
    const cartItems = cart.map((item) =>{
    return(
        `${item.name} Quantidade: (${item.quantity}) Valor: R$ ${item.price.toFixed(2)} | `
    )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "+5561995713388"
    
    window.open(`https://wa.me/${phone}?text=Pedido: ${message}%0A Cliente: ${nameInput.value}%0A Endereço: ${addressInput.value}%0A Total a pagar: R$ ${cartTotal.textContent}`, "_blank")

    cart = [];
    updateCartModal();
    cartModal.style.display = "none"
})

// verificar a hora e manipular o card de horario
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 17 && hora < 23;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}