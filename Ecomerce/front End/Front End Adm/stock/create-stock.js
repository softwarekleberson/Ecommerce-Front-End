const form = document.getElementById('productForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
        productId: document.getElementById('productId').value
    };

    fetch('http://localhost:8080/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(result => {
            alert('Create new inventory!');
            console.log('Resposta do backend:', result);
            form.reset();
        })
        .catch(error => {
            alert(error.message || ' Error id product not found! ');
            console.error('Erro do backend:', error);
        });
});
