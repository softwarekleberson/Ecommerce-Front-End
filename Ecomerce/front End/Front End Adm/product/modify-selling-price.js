document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            productId: document.getElementById("productId").value.trim(),
            newPrice: document.getElementById("newPrice").value.trim(),
        };

        try {
            const response = await fetch("http://localhost:8080/products/selling/price", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                let errorMessage = "An unexpected error occurred while processing the request.";

                try {

                    const error = await response.json();
                    errorMessage = error.message || errorMessage;
                } catch {

                    const text = await response.text();
                    errorMessage = text || errorMessage;
                }

                throw new Error(errorMessage);
            }

            if (response.status === 204) {
                alert("Price product successfully change!");
                form.reset();
                return;
            }

            const result = await response.json();
            alert(`Price product successfully change!\n\nProduct ID: ${result.productId}`);
            form.reset();

        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error("Error details:", error);
        }
    });
});
