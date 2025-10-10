async function carregarDetalhesLivro(id) {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const product = await response.json();
        preencherTabela(product);
        preencherDetalhes(product);
        exibirImagemPrincipal(product.midias[0].url);
        exibirPreco(product.precificacao);
    } catch (error) {
        console.error('Erro ao carregar detalhes do product:', error);
    }
}

function preencherTabela(product) {
    const table = document.getElementById('livroDetails');
    const data = [
        { item: 'Brand', informacao: `${product.brand}` },
        { item: 'Pages', informacao: `${product.page} pages` },
        { item: 'ISBN', informacao: product.isbn },
        { item: 'Dimension', informacao: `${product.width} x ${product.height} x ${product.length} cm` },
        { item: 'Weight', informacao: `${product.weight} grams` }
    ];

    data.forEach(({ item, informacao }) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = item;
        cell2.textContent = informacao;
    });
}

function preencherDetalhes(product) {
    document.getElementById('titulo').textContent = product.name;
    document.getElementById('autor').textContent = product.author;
    document.getElementById('sinopse').textContent = product.synopsis;
    document.getElementById('preco').textContent = 'R$ : ' + product.price.toFixed(2);
}

function exibirImagemPrincipal(urlImagem) {
    const imgElement = document.querySelector('.imagem-principal');
    imgElement.src = urlImagem;
}

function exibirPreco(preco) {
    document.getElementById('preco').textContent = `${preco.toFixed(2)}`;
}

const urlParams = new URLSearchParams(window.location.search);
const idLivro = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    carregarDetalhesLivro(idLivro);

    const quantidadeElemento = document.getElementById('quantidade');
    let quantidade = parseInt(quantidadeElemento.textContent, 10);

    document.getElementById('incrementar').addEventListener('click', () => {
        quantidade += 1;
        quantidadeElemento.textContent = quantidade;
    });

    document.getElementById('decrementar').addEventListener('click', () => {
        if (quantidade > 0) {
            quantidade -= 1;
            quantidadeElemento.textContent = quantidade;
        }
    });
});
