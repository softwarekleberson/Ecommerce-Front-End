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
                throw new Error('Error loading deliveries: ' + response.statusText);
            }

            const data = await response.json();
            userList.innerHTML = '';

            // Card fixo para adicionar nova entrega
            const cardFixo = document.createElement('div');
            cardFixo.classList.add('card');
            const addLink = document.createElement('a');
            addLink.classList.add('link');
            addLink.href = `create-delivery.html?id=${clienteId}`;
            addLink.textContent = 'Add';
            const actionsDivFixo = document.createElement('div');
            actionsDivFixo.classList.add('actions');
            actionsDivFixo.appendChild(addLink);
            cardFixo.appendChild(document.createElement('h2')).textContent = 'Add Delivery';
            cardFixo.appendChild(actionsDivFixo);
            userList.appendChild(cardFixo);

            if (Array.isArray(data.deliveres)) {
                data.deliveres.forEach(entrega => {
                    const div = document.createElement('div');
                    div.classList.add('card');

                    // Conteúdo da entrega
                    div.innerHTML = `
                        <h3>${entrega.receiver}</h3>
                        <p>${entrega.street}</p>
                        <p>${entrega.typeResidence} - ${entrega.number} ${entrega.observation ?? ''}</p>
                        <p>${entrega.city}, ${entrega.state} ${entrega.zipCode}</p>
                        <p>${entrega.country}</p>
                    `;

                    // Ações
                    const actionsDiv = document.createElement('div');
                    actionsDiv.classList.add('actions');

                    // Botão Delete
                    const deleteLink = document.createElement('a');
                    deleteLink.href = "#";
                    deleteLink.textContent = "Delete";
                    deleteLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        excluirEntrega(entrega.id, clienteId);
                    });

                    // Separador
                    const separator = document.createElement('span');
                    separator.textContent = " | ";

                    // Botão Edit
                    const editLink = document.createElement('a');
                    editLink.href = `update-delivery.html?id=${clienteId}&entregaId=${entrega.id}`;
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
            console.error("Error loading deliveries:", error);
        }
    }

    carregarEntregas();
});

async function excluirEntrega(idEntrega, clienteId) {
    if (confirm("Are you sure you want to delete this delivery?")) {
        try {
            const response = await fetch(`http://localhost:8080/customers/${clienteId}/deliveries/${idEntrega}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                alert("This delivery address is being used in an order.");
                throw new Error('Error deleting delivery: ' + response.statusText);
            }

            alert("Delivery deleted successfully!");
            location.reload();
        } catch (error) {
            console.error("Error deleting delivery:", error);
        }
    }
}
