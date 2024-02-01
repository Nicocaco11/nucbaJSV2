const productsCart = document.querySelector("#cart")

window.addEventListener("DOMContentLoaded", () =>{

function cartRender(render){

    let cartHTML = ``
    let cartList = JSON.parse(localStorage.getItem("carrito")) || []

    const cartKeys = Object.keys(cartList)
        for (let i = 0; i < cartKeys.length; i++) {
            const key = cartKeys[i]
            const newCartList = cartList[key];
    
        for (let j = 0; j < newCartList.cantidad; j++){
            
            cartHTML += `
            <div class="cart">
            <img src="${newCartList.img}" alt="${newCartList.nombre}">
            <div class="cart__content">
                <h2>${newCartList.nombre}</h2>
                <p>$${newCartList.precio}</p>
                <div class="cart__content--row">
                    <p>Comprar</p>
                    <p class="delete" data-key="${key}">Eliminar</p>
                </div>
            </div>
        </div>
            `

        }    

        }

        render.innerHTML = cartHTML

        const deleteBtn = document.querySelectorAll(".delete")
        deleteBtn.forEach(element => {
            element.addEventListener("click", eliminarProducto)
        })
}    

function eliminarProducto(event){
    const key = event.target.dataset.key
    let cartList = JSON.parse(localStorage.getItem("carrito"))

    if (cartList[key] && cartList[key].cantidad > 1){
        cartList[key].cantidad -= 1
    } else{
        delete cartList[key]
    }

    localStorage.setItem("carrito", JSON.stringify(cartList))
    cartRender(productsCart)
}

})