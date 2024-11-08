// Selecionando elementos da página
const produtos = document.querySelectorAll('.produto');
const carrinho = document.getElementById('carrinho');
const totalElement = document.getElementById('totalValue');

let total = 0;
let produtosNoCarrinho = {};

// Função que atualiza o valor total no HTML
function atualizarTotal(valor) {
    total += valor;
    totalElement.textContent = total.toFixed(2);
}

// Adicionando eventos de drag para cada produto
produtos.forEach(produto => {
    produto.addEventListener('dragstart', dragStart);
    produto.addEventListener('dragend', dragEnd);
});

// Função chamada quando o arraste do produto começa
function dragStart(event) {
    event.dataTransfer.setData('preco', event.target.dataset.preco);
    event.dataTransfer.setData('produto', event.target.textContent); 
    event.target.classList.add('dragging');
}

// Função chamada quando o arraste do produto termina
function dragEnd(event) {
    event.target.classList.remove('dragging');
}

// Permite que o carrinho receba itens arrastados
carrinho.addEventListener('dragover', event => {
    event.preventDefault();  // É necessário para permitir o drop do produto
});

// Função chamada quando um produto é solto no carrinho
carrinho.addEventListener('drop', event => {
    event.preventDefault();

    const preco = parseFloat(event.dataTransfer.getData('preco'));
    const produtoNome = event.dataTransfer.getData('produto');

    // Verifica se o produto já está no carrinho
    if (produtosNoCarrinho[produtoNome]) {
        produtosNoCarrinho[produtoNome].quantidade++;
        produtosNoCarrinho[produtoNome].elemento.textContent = `${produtoNome} x${produtosNoCarrinho[produtoNome].quantidade}`;
    } else {
        const novoProduto = document.createElement('div');
        novoProduto.textContent = `${produtoNome} x1`;
        novoProduto.classList.add('produtoCarrinho');
        novoProduto.dataset.preco = preco;
        novoProduto.draggable = true;

        produtosNoCarrinho[produtoNome] = {
            elemento: novoProduto,
            quantidade: 1
        };

        carrinho.appendChild(novoProduto);

        // Adiciona o evento de arrastar para os produtos no carrinho
        novoProduto.addEventListener('dragstart', dragStart);
        novoProduto.addEventListener('dragend', dragEndCarrinho);
    }

    atualizarTotal(preco);
});

// Função chamada quando o produto no carrinho é arrastado
function dragEndCarrinho(event) {
    const produtoNome = event.target.textContent.split(' x')[0];
    const preco = parseFloat(event.target.dataset.preco);

    // Atualiza o total
    atualizarTotal(-preco); // Atualiza o total ao remover o item
    produtosNoCarrinho[produtoNome].elemento.remove(); // Remove o elemento do DOM
    delete produtosNoCarrinho[produtoNome]; // Remove o item do carrinho
}

// Adiciona o evento dragleave ao carrinho
carrinho.addEventListener('dragleave', event => {
    const produtoNome = event.dataTransfer.getData('produto');

    if (produtosNoCarrinho[produtoNome]) {
        // Verifica se o produto está saindo da div do carrinho
        atualizarTotal(-parseFloat(produtosNoCarrinho[produtoNome].elemento.dataset.preco));
        produtosNoCarrinho[produtoNome].elemento.remove();
        delete produtosNoCarrinho[produtoNome];
    }
});
