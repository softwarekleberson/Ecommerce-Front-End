// stock/index.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("stockForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o envio padrão do form

        // Captura os valores do formulário
        const stockData = {
            productId: document.getElementById("productId").value,
            quantity: parseInt(document.getElementById("quantity").value),
            productQuality: document.getElementById("productQuality").value,
            purchasePrice: parseFloat(document.getElementById("purchasePrice").value),
            coin: document.getElementById("coin").value,
            supplier: document.getElementById("supplier").value
        };

        try {
            const response = await fetch("http://localhost:8080/stock/input", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(stockData)
            });

            // Se a resposta não for OK, pega a mensagem de erro do backend
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert("Stock registered successfully!");
            console.log("Resposta do backend:", result);

            // Limpa o formulário após envio
            form.reset();

        } catch (error) {
            console.error("Error submitting stock:", error);
            alert(error.message || "Failed to register stock. See console for details.");
        }
    });
});
