document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('userList');
  if (!userList) {
    console.error('#userList não encontrado');
    return;
  }

  // Recupera o token JWT do localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You need to be logged in to access this page.');
    window.location.href = 'login.html';
    return;
  }

  // Card fixo "Add"
  const addCardDiv = document.createElement('div');
  addCardDiv.className = 'card';
  addCardDiv.innerHTML = `
    <h2>Add Card</h2>
    <div class="actions">
      <a class="link" href="create-card.html">Add</a>
    </div>
  `;
  userList.appendChild(addCardDiv);

  // Carrega os cartões
  loadCards();

  async function loadCards() {
    try {
      const res = await fetch('http://localhost:8080/customer/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`Erro HTTP ${res.status} - ${res.statusText}`);
      }

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
            <a href="edit-card.html?cardId=${card.cardId}">Edit</a>
          </div>
        `;
        userList.appendChild(cardDiv);
      });

      // Delegação de evento para deletar
      userList.addEventListener('click', async (e) => {
        const link = e.target.closest('.btn-delete');
        if (!link) return;
        e.preventDefault();
        const cardId = link.getAttribute('data-card-id');
        await deleteCard(cardId);
      });

    } catch (err) {
      console.error('Error loading cards:', err);
      alert('We were unable to load the cards. Please log in again.');
    }
  }

  async function deleteCard(cardId) {
    if (!confirm('Are you sure you want to delete this card? This action cannot be undone.')) return;

    try {
      const res = await fetch(`http://localhost:8080/customer/card/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

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
});
