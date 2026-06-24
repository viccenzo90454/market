function login(){
    var nome = $("#nome").val().trim()
    var senha = $("#senha").val().trim()

    if(nome && senha && nome === "admin" && senha === "12345"){
        const user = {
            name: nome,
            dataEntrada: new Date(),
            id: Math.floor(Math.random() * 100000)
        }
        localStorage.setItem('usuario', JSON.stringify(user))
        window.location.href = "../loja/index.html"
        return
    }

    document.getElementById("error-modal").style.display = "block"
    document.getElementById("nome").style.border = "1px solid #d46a6a"
    document.getElementById("senha").style.border = "1px solid #d46a6a"
}

function showPassword(){
    var inputSenha = document.querySelector('#senha')
    var img_eye = document.querySelector('#eye')

    if (inputSenha.getAttribute('type') === "password"){
        inputSenha.setAttribute('type', "text")
        img_eye.setAttribute('src', '../../public/hide.png')
    } else {
        inputSenha.setAttribute('type', 'password')
        img_eye.setAttribute('src', '../../public/view.png')
    }
}

function fecharError(){
    document.getElementById("error-modal").style.display = "none"
    document.getElementById("nome").style.border = "1px solid rgba(76, 88, 109, 0.25)"
    document.getElementById("senha").style.border = "1px solid rgba(76, 88, 109, 0.25)"
}