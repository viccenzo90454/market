let produtos = []
let currentPage = 1
const itemsPerPage = 12

window.onload = function(){
    var storageUser = localStorage.getItem('usuario')
    var user = JSON.parse(storageUser)
    var dataEntrada = new Date(user.dataEntrada)

    var dataFormatada = dataEntrada.toLocaleString("pt-BR",{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    document.getElementById('user').textContent = user.name
    document.getElementById('perfil').textContent = dataFormatada
    document.getElementById('idPerfil').textContent = user.id
}

document.addEventListener('DOMContentLoaded', function(){
    fetch("../Dados/data.json")
        .then((response) => response.json())
        .then((data) => {
            produtos = data
            renderPage(currentPage)
            renderPagination()
        }).catch((error) => console.log("Erro ao carregador dados", error)) 
})

function renderPage(page) {
    const produtosContainer = document.getElementById("produtos-container")
    produtosContainer.innerHTML = ''

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pageItems = produtos.slice(startIndex, endIndex)

    pageItems.forEach((produto, pageIndex) => {
        const index = startIndex + pageIndex
        const card = document.createElement("div")
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.desc}" onerror="this.src='../../public/logo.png'">
                <div class="card-body">
                    <h5 class="card-title">${produto.desc}</h5>
                    <p class="card-text">$${produto.valor.toFixed(2)}</p>
                    <button type="button" class="btn btn-primary adicionar" data-indice="${index}">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>`
        produtosContainer.appendChild(card)
    })
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container')
    paginationContainer.innerHTML = ''
    const totalPages = Math.ceil(produtos.length / itemsPerPage)
    if(totalPages <= 1) return

    const createPageItem = (label, page, active = false, disabled = false) => {
        const item = document.createElement('li')
        item.className = `page-item ${active ? 'active' : ''} ${disabled ? 'disabled' : ''}`
        const link = document.createElement('a')
        link.className = 'page-link'
        link.href = '#'
        link.textContent = label
        link.addEventListener('click', function(event) {
            event.preventDefault()
            if(disabled || currentPage === page) return
            currentPage = page
            renderPage(currentPage)
            renderPagination()
        })
        item.appendChild(link)
        return item
    }

    paginationContainer.appendChild(createPageItem('Anterior', currentPage - 1, false, currentPage === 1))

    for(let page = 1; page <= totalPages; page++) {
        paginationContainer.appendChild(createPageItem(page, page, currentPage === page, false))
    }

    paginationContainer.appendChild(createPageItem('Próximo', currentPage + 1, false, currentPage === totalPages))
}

document.getElementById("produtos-container").addEventListener("click", function(event){
    const btn = event.target.closest(".adicionar")
    if(!btn) return

    event.preventDefault()
    const indexDoProduto = btn.dataset.indice
    const produtoSelecionado = produtos[indexDoProduto]
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    carrinho.push(produtoSelecionado)
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
    alert("Produto adicionado com sucesso!!!")
})