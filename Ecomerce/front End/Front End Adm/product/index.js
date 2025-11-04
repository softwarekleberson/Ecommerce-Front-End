// --- Controle de mídias dinâmicas ---
document.getElementById('addMedia').addEventListener('click', () => {
    const container = document.getElementById('mediaContainer');
    const index = container.children.length;
    const div = document.createElement('div');
    div.className = 'media-group';
    div.innerHTML = `
        <label>Media URL</label>
        <input type="url" name="midias[${index}].url">

        <label>Media Description</label>
        <input type="text" name="midias[${index}].description">
    `;
    container.appendChild(div);
});

// --- Envio do formulário ---
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    // Converte o FormData em objeto JSON
    formData.forEach((value, key) => {
        const match = key.match(/midias\[(\d+)\]\.(\w+)/);
        if (match) {
            const index = parseInt(match[1], 10);
            const field = match[2];
            data.midias = data.midias || [];
            data.midias[index] = data.midias[index] || {};
            data.midias[index][field] = value;
        } else {
            data[key] = value;
        }
    });

    // Conversão de tipos
    if (data.pricing) data.pricing = parseFloat(data.pricing);
    if (data.page) data.page = parseInt(data.page, 10);
    if (data.height) data.height = parseFloat(data.height);
    if (data.width) data.width = parseFloat(data.width);
    if (data.length) data.length = parseFloat(data.length);
    if (data.weight) data.weight = parseFloat(data.weight);
    if (data.publisherDate) data.publisherDate = new Date(data.publisherDate).toISOString();

    console.log("Data prepared for sending:", data);

    try {
        const response = await fetch("http://localhost:8080/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Falha ao enviar: ${response.status}`);
        }

        alert("Product successfully registered!");

        // Limpa o formulário e reseta as mídias
        e.target.reset();
        document.getElementById('mediaContainer').innerHTML = `
            <div class="media-group">
                <label>Media URL</label>
                <input type="url" name="midias[0].url">

                <label>Media Description</label>
                <input type="text" name="midias[0].description">
            </div>
        `;

    } catch (error) {
        console.error("❌ Error sending product.:", error);
        alert("Error registering the product. Check the console..");
    }
});
