//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
let vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;



//functions
//vaciar-carrito//










loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}



function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}

document.querySelector('.btn-55').addEventListener('click', vaciarCarrito);

document.querySelector('.btn-56').addEventListener('click', vaciarCarrito);

 function clearHtml(){
    containerBuyCart.innerHTML = '';

 }

 //vaciar//
 // Función para vaciar el carrito
function vaciarCarrito() {
    {
        buyThings = [];
        totalCard = 0;
        priceTotal.innerHTML='';
        countProduct = 0;
        amountProduct.innerHTML='';
        loadHtml();
    }
}
function vaciarCarrito2() {
    {
        buyThings = [];
        totalCard = 0;
        priceTotal.innerHTML='';
        countProduct = 0;
        amountProduct.innerHTML='';
        loadHtml();
    }
}

//ALERTA COMPRA REALIZADA CON EXITO//
document.addEventListener("DOMContentLoaded", function() {
    const btnCompra = document.querySelector(".btn-56");
    const alertaCompra = document.querySelector(".alerta-compra");

    btnCompra.addEventListener("click", function() {
        alertaCompra.style.display = "block";
        setTimeout(function() {
            alertaCompra.style.display = "none";
        }, 2000); // Oculta la alerta después de 2 segundos
    });
});

//ALERTA CANCELAR COMPRA//
document.addEventListener("DOMContentLoaded", function() {
    const btnCompra = document.querySelector(".btn-55");
    const alertaCompra = document.querySelector(".alerta-finalizar");

    btnCompra.addEventListener("click", function() {
        alertaCompra.style.display = "block";
        setTimeout(function() {
            alertaCompra.style.display = "none";
        }, 2000); // Oculta la alerta después de 2 segundos
    });
});

 