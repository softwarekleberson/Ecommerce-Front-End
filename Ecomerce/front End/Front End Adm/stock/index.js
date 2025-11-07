// stock/index.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("stockForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Captura os valores do formulário
        const stockData = {
            productId: document.getElementById("productId").value.trim(),
            quantity: parseInt(document.getElementById("quantity").value),
            productQuality: document.getElementById("productQuality").value.trim(),
            purchasePrice: parseFloat(document.getElementById("purchasePrice").value),
            coin: document.getElementById("coin").value.trim(),
            supplier: document.getElementById("supplier").value.trim()
        };

        // 🔑 Recupera o token do localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Authentication token not found. Please log in again.");
            window.location.href = "/login.html";
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/adm/stock/input", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // ✅ Token JWT
                },
                body: JSON.stringify(stockData)
            });

            // Se a resposta não for OK, tenta pegar mensagem do backend
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP Error ${response.status}`);
            }

            alert("Stock registered successfully!");
            console.log("📦 Stock created:", stockData);

            // 🔄 Limpa o formulário
            form.reset();

        } catch (error) {
            console.error("❌ Error submitting stock:", error);
            alert(error.message || "Failed to register stock. See console for details.");
        }
    });
});
