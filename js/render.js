const products = [
    { id: 1, nombre: "Geforce GT 210 MSI", precio: 83599.99, category: "graphics", img: "../src/products/Graphics/video-geforce-gt-210-msi-1gb-ddr3-0.jpg" },
    { id: 2, nombre: "Geforce GTX 1630 4GB Ventus", precio: 213130.01, category: "graphics", img: "../src/products/Graphics/video-geforce-gtx-1630-4gb-ventus-xs-oc-0.jpg" },
    { id: 3, nombre: "Geforce GTX 1650 4GB Asus", precio: 255000.03, category: "graphics", img: "../src/products/Graphics/video-geforce-gtx-1650-4gb-asus-dual-0.jpg" },
    { id: 4, nombre: "Geforce GTX 1660 6GB GigaByte", precio: 566549.99, category: "graphics", img: "../src/products/Graphics/video-geforce-gtx-1660-6gb-gigabyte-oc-nv-0.jpg" },
    { id: 5, nombre: "Geforce RTX 3060TI 8GB PNY Verto Dual Fan", precio: 588209.96, category: "graphics", img: "../src/products/Graphics/video-geforce-rtx-3060-ti-8gb-pny-verto-dual-fan-0.jpg" },
    { id: 6, nombre: "Geforce RTX 4060 8GB MSI Gaming", precio: 619129.98, category: "graphics", img: "../src/products/Graphics/video-geforce-rtx-4060-8gb-msi-gaming-x-0.jpg" },
    { id: 7, nombre: "Micro AMD Ryzen 5 4600G", precio: 198499.99, category: "processors", img: "../src/products/Processors/micro-amd-ryzen-5-4600g-cvideo-0.jpg" },
    { id: 8, nombre: "Micro AMD Ryzen 5 5600G", precio: 238600.03, category: "processors", img: "../src/products/Processors/micro-amd-ryzen-5-5600g-0.jpg" },
    { id: 9, nombre: "Micro AMD Ryzen 5 7600G", precio: 35200.03, category: "processors", img: "../src/products/Processors/micro-amd-ryzen-5-7600-cvideo-ccooler-am5-0.jpg" },
    { id: 10, nombre: "Memoria SODIMM 8GB DDR4 3200 HIKVISION", precio: 27122.16, category: "ram", img: "../src/products/RAM/memoria-sodimm-8gb-ddr4-3200-hikvision-0.jpg" },
    { id: 11, nombre: "Memoria SODIMM 8GB DDR4 3200 ADATA PREMIER", precio: 29609.97, category: "ram", img: "../src/products/RAM/memoria-sodimm-8gb-ddr4-3200-adata-premier-0.jpg" },
    { id: 12, nombre: "Memoria SODIMM 32GB DDR5 4800 ADATA", precio: 195549.99, category: "ram", img: "../src/products/RAM/memoria-sodimm-32gb-ddr5-4800-adata-0.jpg" }
]

const inicioBtn = document.querySelector("#inicioBtn")
const categoriasBtn = document.querySelector("#categoriasBtn")
const carritoBtn = document.querySelector("#nav__cart")
const indexContent = document.querySelector("#hero")
const productsContent = document.querySelector("#products")
const cartContent = document.getElementById("cartContent")

function mostrarIndex() {
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

    categoriasBtn.addEventListener("click", renderizarProductos)

    inicioBtn.addEventListener("click", () => {
        limpiarContenido()
        indexContent.innerHTML = inicio
    })

    carritoBtn.addEventListener("click", () => {
        limpiarContenido()
        mostrarCarrito()
    })
}

function renderizarProductos() {
    let contentHTML = ""

    for (let i = 0; i < products.length; i++) {
        const productsArray = products[i]
        contentHTML += `
            <div class="products__content">
                <img src="${productsArray.img}" alt="${productsArray.nombre}">
                <div>
                    <h2>${productsArray.nombre}</h2>
                    <p class="products__price">$${productsArray.precio}</p>
                    <p class="products__cart" data-index="${i}"><i class="bx bxs-cart"> Agregar al carrito</i></p>
                </div>
            </div>
        `
    }

    limpiarContenido()
    productsContent.innerHTML = contentHTML

    agregarEventosAlCarrito()
}

function agregarEventosAlCarrito() {
    const cartAddElements = document.querySelectorAll(".products__cart")
    cartAddElements.forEach((cartAddElement, index) => {
        cartAddElement.addEventListener("click", () => {
            const producto = products[index]
            if (producto) {
                agregarAlCarrito(producto)
            } else {
                console.error("Producto no encontrado en la posición:", index)
            }
        })
    })
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {}
    const id = producto.id

    if (carrito[id]) {
        carrito[id].cantidad += 1
    } else {
        carrito[id] = { ...producto, cantidad: 1 }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarContenidoCarrito()
}

function limpiarContenido() {
    productsContent.innerHTML = ""
    carritoBtn.innerHTML = ""
    cartContent.innerHTML = ""
}

function mostrarCarrito() {
    const carritoHTML = `
        <div class="cart__content">
            <!-- Contenido del carrito -->
        </div>
    `

    indexContent.innerHTML = ""
    productsContent.innerHTML = ""
    carritoBtn.innerHTML = carritoHTML

    renderizarContenidoCarrito()
}

function renderizarContenidoCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || {}
    let cartHTML = `<p class="comprarTodo">COMPRAR TODO</p>`

    Object.values(carrito).forEach((producto) => {
        const cardHTML = `
            <div class="cart" data-id="${producto.id}">
                <img src="${producto.img}" alt="${producto.nombre}">
                <div class="cart__content">
                    <h2>${producto.nombre}</h2>
                    <p class="cart__price">$${producto.precio}</p>
                    <div class="cart__content--row">
                        <p class="comprar" data-id="${producto.id}">Comprar</p>
                        <p class="eliminar" data-id="${producto.id}">Eliminar</p>
                    </div>
                </div>
            </div>
        `
        cartHTML += cardHTML
    })

    cartContent.innerHTML = cartHTML

    const comprarButtons = document.querySelectorAll(".comprar")
    const eliminarButtons = document.querySelectorAll(".eliminar")
    const comprarTodoButton = document.querySelector(".comprarTodo")

    comprarButtons.forEach((button) => {
        button.addEventListener("click", () => {
            comprarProducto(button.dataset.id)
        })
    })

    eliminarButtons.forEach((button) => {
        button.addEventListener("click", () => {
            eliminarProducto(button.dataset.id)
        })
    })

    comprarTodoButton.addEventListener("click", () => {
        comprarTodo()
    })
}

function comprarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {}
    const producto = carrito[id]

    if (producto) {
        if (producto.cantidad > 1) {
            carrito[id].cantidad -= 1
        } else {
            delete carrito[id]
        }

        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarContenidoCarrito()
    }
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || {}
    const producto = carrito[id]

    if (producto) {
        if (producto.cantidad > 1) {
            carrito[id].cantidad -= 1
        } else {
            delete carrito[id]
        }

        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarContenidoCarrito()
    }
}

function comprarTodo() {
    localStorage.removeItem("carrito")
    renderizarContenidoCarrito()
}

mostrarIndex()