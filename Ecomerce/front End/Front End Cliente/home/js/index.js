document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8080/public/product");
    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const produtos = await response.json();

    // Separar por tipo
    const books = produtos.filter(p => p.type === "book");
    const bags = produtos.filter(p => p.type === "bag");

    // Containers
    const booksContainer = document.getElementById("books-container");
    const bagsContainer = document.getElementById("bags-container");

    // Render books
    books.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card__image" src="${book.midias[0]?.url || 'https://via.placeholder.com/200'}" alt="${book.name}">
        <h3 class="card__title">${book.name}</h3>
        <p class="card__meta">${book.author || ''}</p>
        <div class="card__price">${book.price} ${book.typeCoin}</div>
        <p class="card__desc">${book.synopsis || ''}</p>
        <div class="card__actions">
          <button class="btn btn-details">Details</button>
        </div>
      `;
      booksContainer.appendChild(card);

      // Evento para Detalhes - Redireciona para página específica de livros
      card.querySelector('.btn-details').addEventListener('click', () => {
        window.location.href = `book-details.html?id=${book.id}`;
      });
    });

    // Render bags
    bags.forEach(bag => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="card__image" src="${bag.midias[0]?.url || 'https://via.placeholder.com/200'}" alt="${bag.name}">
        <h3 class="card__title">${bag.name}</h3>
        <p class="card__meta">${bag.brand || ''}</p>
        <div class="card__price">${bag.price} ${bag.typeCoin}</div>
        <p class="card__desc">${bag.description || ''}</p>
        <div class="card__actions">
          <button class="btn btn-details">Details</button>
        </div>
      `;
      bagsContainer.appendChild(card);

      // Evento para Detalhes - Redireciona para página específica de bolsas
      card.querySelector('.btn-details').addEventListener('click', () => {
        window.location.href = `bag-details.html?id=${bag.id}`;
      });
    });

  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
});
