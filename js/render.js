import {products} from "./products.js"

const inicioBtn = document.querySelector("#inicioBtn")
const categoriasBtn = document.querySelector("#categoriasBtn")
const carritoBtn = document.querySelector("#nav__cart")
const indexContent = document.querySelector("#hero")
const productsContent = document.querySelector("#products")
const cartContent = document.querySelector("#cart")


function mostrarIndex(){

const inicio = `
<div class="hero__content">
    
    <h2>EL PODER EN LA PALMA DE TU <span class="hero__red">MANO</span></h2>
    <div class="hero__button">
        <a class="hero__button--enabled" href="#about">Nósotros</a>
        <a href="html/cart.html">Ver más</a>
    </div>
</div>
`

indexContent.innerHTML = inicio

categoriasBtn.addEventListener("click", () => {
    
    let contentHTML = ``

    for (let i = 0; i < products.length; i++) {
        const productsArray = products[i]
        contentHTML += `
        <div class="products__content">
        <img src="${productsArray.img}" alt="${productsArray.nombre}">
        <div>
            <h2>${productsArray.nombre}</h2>
            <p class="products__price">$${productsArray.precio}</p>
            <p class="products__cart"><i class="bx bxs-cart"> Agregar al carrito</i></p>
        </div>
    </div>
    ` 
    }

    indexContent.innerHTML = ``
    productsContent.innerHTML = contentHTML

})

inicioBtn.addEventListener("click", () => {
    productsContent.innerHTML = ``
    indexContent.innerHTML = inicio
})

carritoBtn.addEventListener("click", () => {
    productsContent.innerHTML = ``
    indexContent.innerHTML = ``
    cartContent.innerHTML = ``
})

}

window.addEventListener("DOMContentLoaded", () => {
    const cartAddElements = document.querySelectorAll(".products__cart");
    let carritoAdd = JSON.parse(localStorage.getItem("carrito")) || [];

    const guardarCarritoEnLocalStorage = () => {
        localStorage.setItem("carrito", JSON.stringify(carritoAdd));
    };

    const agregarAlCarrito = (producto) => {
        const indexEnCarrito = carritoAdd.findIndex(item => item.id === producto.id);

        if (indexEnCarrito !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            carritoAdd[indexEnCarrito].cantidad += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo
            carritoAdd.push({ ...producto, cantidad: 1 });
        }

        guardarCarritoEnLocalStorage();
    };

    // Agregar eventos de clic a los elementos del carrito
    cartAddElements.forEach((cartAddElement, i) => {
        alert("Funko")
        cartAddElement.addEventListener("click", () => {
            agregarAlCarrito(products[i]);
        });
    });
});

mostrarIndex()