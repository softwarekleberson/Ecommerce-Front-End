document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    const params = new URLSearchParams(window.location.search);
    const clienteId = params.get('id');
    const entregaId = params.get('entregaId');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = {
            receiver: document.getElementById('receiver').value,
            zipCode: document.getElementById('zipCode').value,
            typeResidence: document.getElementById('typeResidence').value,
            streetType: document.getElementById('streetType').value,
            street: document.getElementById('street').value,
            number: document.getElementById('number').value,
            neighborhood: document.getElementById('neighborhood').value,
            observation: document.getElementById('observation').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value
        };

        try {
            const response = await fetch(`http://localhost:8080/customers/${clienteId}/charges/${entregaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error updating delivery: ' + response.statusText);
            }

            alert('Billing updated successfully!');

            document.getElementById("form").reset();
            window.location.href = "index.html";

        } catch (error) {
            console.error('Error updating billing:', error);
            alert('Failed to update billing. Please check your data.');
        }
    });
});
