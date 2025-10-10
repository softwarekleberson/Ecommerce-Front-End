document.addEventListener('DOMContentLoaded', function () {
    const userList = document.getElementById('user-list');

    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get("id");

    async function carregarEntregas() {
        try {
            const response = await fetch(`http://localhost:8080/customers/${clienteId}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Error loading billing: ' + response.statusText);
            }

            const data = await response.json();

            userList.innerHTML = '';

            // Card fixo para adicionar nova cobrança
            const cardFixo = document.createElement('div');
            cardFixo.classList.add('card');
            cardFixo.innerHTML = `
                <h2>Add Billing</h2>
                <div class="actions">
                    <a class="link" href="create-charge.html?id=${clienteId}">Add</a>
                </div>
            `;
            userList.appendChild(cardFixo);

            if (Array.isArray(data.charges)) {
                data.charges.forEach(entrega => {
                    const div = document.createElement('div');
                    div.classList.add('card');

                    div.innerHTML = `
                        <h3>${entrega.receiver}</h3>
                        <p>${entrega.street}</p>
                        <p>${entrega.typeResidence} - ${entrega.number} ${entrega.observation ?? ''}</p>
                        <p>${entrega.city}, ${entrega.state} ${entrega.zipCode}</p>
                        <p>${entrega.country}</p>
                    `;

                    const actionsDiv = document.createElement('div');
                    actionsDiv.classList.add('actions');

                    // Botão Delete
                    const deleteLink = document.createElement('a');
                    deleteLink.href = "#";
                    deleteLink.textContent = "Delete";
                    deleteLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        excluirEntrega(clienteId, entrega.id);
                    });

                    // Separador
                    const separator = document.createElement('span');
                    separator.textContent = " | ";

                    // Botão Edit
                    const editLink = document.createElement('a');
                    editLink.href = `update-charge.html?id=${clienteId}&entregaId=${entrega.id}`;
                    editLink.textContent = "Edit";

                    actionsDiv.appendChild(deleteLink);
                    actionsDiv.appendChild(separator);
                    actionsDiv.appendChild(editLink);

                    div.appendChild(actionsDiv);
                    userList.appendChild(div);
                });
            } else {
                console.error('Unexpected data format:', data);
            }

        } catch (error) {
            console.error("Error loading billing:", error);
        }
    }

    carregarEntregas();
});

async function excluirEntrega(clienteId, idEntrega) {
    if (confirm("Are you sure you want to delete this billing?")) {
        try {
            const response = await fetch(`http://localhost:8080/customers/${clienteId}/charges/${idEntrega}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete billing');
            }

            alert("Billing deleted successfully!");
            location.reload();
        } catch (error) {
            console.error("Error deleting billing:", error);
        }
    }
}
