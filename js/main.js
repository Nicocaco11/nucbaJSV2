const iconoMenu = document.querySelector("#nav__responsive")
const menu = document.querySelector(".nav__content")


iconoMenu.addEventListener("click", () =>{
    menu.classList.toggle("disabled")
})

window.addEventListener("resize", () =>{

    menu.classList.add("disabled")

    const width = window.innerWidth

    if (width > 914 && menu.classList.contains("disabled"))
    {
        menu.classList.remove("disabled")
    }

})

document.getElementById("form__contact").addEventListener("submit", function (event) {

    document.getElementById("nombreError").textContent = ""
    document.getElementById("correoError").textContent = ""
    document.getElementById("descripcionError").textContent = ""

    let nombre = document.getElementById("nombre").value.trim()
    let correo = document.getElementById("correo").value.trim()
    let descripcion = document.getElementById("descripcion").value.trim()

    if (nombre === "") {
        document.getElementById("nombreError").textContent = "Ingrese un nombre"
        event.preventDefault()
    }

    if (correo === "") {
        document.getElementById("correoError").textContent = "Ingrese un correo"
        event.preventDefault()
    } else if (!isValidEmail(correo)) {
        document.getElementById("correoError").textContent = "Ingrese un correo válido"
        event.preventDefault()
    }

    if (descripcion === "") {
        document.getElementById("descripcionError").textContent = "Ingrese un mensaje"
        event.preventDefault()
    }
})

function isValidEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
