document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('userList');
  if (!userList) { console.error('#userList não encontrado'); return; }

  const params = new URLSearchParams(window.location.search);
  const customerId = params.get('id');
  if (!customerId) { console.error('Parâmetro ?id= obrigatório'); return; }

  // Card fixo "Add"
  const addCardDiv = document.createElement('div');
  addCardDiv.className = 'card';
  addCardDiv.innerHTML = `
    <h2>Add Card</h2>
    <div class="actions">
      <a class="link" href="create-card.html?id=${customerId}">Add</a>
    </div>
  `;
  userList.appendChild(addCardDiv);

  loadCards();

  async function loadCards() {
    try {
      const res = await fetch(`http://localhost:8080/customers/${customerId}`, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      const data = await res.json();

      const cards = Array.isArray(data.cards) ? data.cards : [];

      cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
          <h3>${card.printedName}</h3>
          <p>Code: ${card.code}</p>
          <p>Main: ${card.main ? 'Yes' : 'No'}</p>
          <div class="actions">
            <a href="#" data-card-id="${card.cardId}" class="btn-delete">Delete</a>
            <p>|</p>
            <a href="edit-card.html?id=${customerId}&cardId=${card.cardId}">Edit</a>
          </div>
        `;
        userList.appendChild(cardDiv);
      });

      // Delegação de evento para deletar (evita problemas de aspas no onclick)
      userList.addEventListener('click', async (e) => {
        const link = e.target.closest('.btn-delete');
        if (!link) return;
        e.preventDefault();
        const cardId = link.getAttribute('data-card-id');
        await deleteCard(customerId, cardId);
      });

    } catch (err) {
      console.error('Request error:', err);
    }
  }
});

async function deleteCard(customerId, cardId) {
  if (!confirm('Are you sure you want to delete this card? This action cannot be undone.')) return;

  const url = `http://localhost:8080/customers/${customerId}/cards/${cardId}`;
  try {
    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) {
      alert('This card cannot be deleted because it is linked to an order.');
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    alert('Card successfully deleted!');
    location.reload();
  } catch (err) {
    console.error('Error deleting card:', err);
    alert('Error deleting card. Please try again.');
  }
}
