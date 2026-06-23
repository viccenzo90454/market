document.addEventListener('DOMContentLoaded', function() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    const listElement = document.getElementById('lista')
    const totalElement = document.getElementById('total')
    const emptyMessage = document.getElementById('empty-message')
    const pedidoMessage = document.getElementById('pedido')

    function formatarPreco(valor) {
        return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    function exibirCarrinho(){
        listElement.innerHTML = ''
        let totalPreco = 0

        if (carrinho.length === 0) {
            emptyMessage.style.display = 'block'
            totalElement.textContent = 'Total: R$0,00'
            return
        }

        emptyMessage.style.display = 'none'

        carrinho.forEach(function(item, index){
            const precoItem = (item.valor ?? item.preco ?? 0)
            const listItem = document.createElement('li')
            listItem.className = 'cart-item'

            const itemText = document.createElement('div')
            const title = document.createElement('span')
            title.textContent = item.desc || 'Produto'
            const price = document.createElement('small')
            price.textContent = `R$${formatarPreco(precoItem)}`

            itemText.appendChild(title)
            itemText.appendChild(price)

            const removeButton = document.createElement('button')
            removeButton.className = 'remove-btn'
            removeButton.textContent = '❌'
            removeButton.addEventListener('click', function() {
                removerItem(index)
            })

            listItem.appendChild(itemText)
            listItem.appendChild(removeButton)
            listElement.appendChild(listItem)
            totalPreco += precoItem
        })

        totalElement.textContent = `Total: R$${formatarPreco(totalPreco)}`
    }

    function removerItem(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()

    window.mostrarPedidoSucesso = function(){
        pedidoMessage.style.display = 'block'
        pedidoMessage.style.opacity = '1'
        setTimeout(function(){
            pedidoMessage.style.transition = 'opacity 0.4s ease'
            pedidoMessage.style.opacity = '0'
            setTimeout(function(){
                pedidoMessage.style.display = 'none'
                pedidoMessage.style.opacity = ''
                pedidoMessage.style.transition = ''
            }, 400)
        }, 2200)
    }
})

function gerar() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
    if (carrinho.length === 0) {
        alert('O carrinho está vazio.')
        return
    }

    const total = carrinho.reduce((sum, item) => sum + (item.valor ?? item.preco ?? 0), 0)
    const conteudo = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Recibo de Pedido</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 24px; background: #f7f8fc; color: #1f2a39; }
                    h1 { margin-bottom: 16px; }
                    ul { list-style: none; padding: 0; }
                    li { margin-bottom: 12px; }
                </style>
            </head>
            <body>
                <h1>PEDIDO CONFIRMADO</h1>
                <h3>Agradecemos sua compra e a sua preferência!</h3>
                <ul>
                    ${carrinho.map(item => `<li>${item.desc || 'Produto'} - R$ ${((item.valor ?? item.preco ?? 0).toFixed(2)).replace('.', ',')}</li>`).join('')}
                </ul>
                <h3>Total: R$ ${total.toFixed(2).replace('.', ',')}</h3>
            </body>
        </html>
    `
    const novaJanela = window.open("", "_blank")
    novaJanela.document.write(conteudo)
    novaJanela.document.close()
    if (window.mostrarPedidoSucesso) window.mostrarPedidoSucesso()
}

