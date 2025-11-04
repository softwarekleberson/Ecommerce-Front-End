document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            productId: document.getElementById("productId").value.trim(),
            justification: document.getElementById("justification").value.trim(),
            category: document.getElementById("category").value
        };

        try {
            const response = await fetch("http://localhost:8080/products/activate", {
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
                alert("Product successfully activet!");
                form.reset();
                return;
            }

            const result = await response.json();
            alert(`Product successfully activet!\n\nProduct ID: ${result.productId}`);
            form.reset();

        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error("Error details:", error);
        }
    });
});
