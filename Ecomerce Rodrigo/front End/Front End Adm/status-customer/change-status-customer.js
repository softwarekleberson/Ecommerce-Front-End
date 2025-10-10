document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const customerId = document.getElementById("customerId").value;

    try {
        const response = await fetch("http://localhost:8080/adm/customers/change-status", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerId: customerId
            })
        });

        if (response.ok) {
            alert("Customer status changed successfully!");
            form.reset(); // 🔹 limpa o formulário
        } else {
            // 🔹 tenta pegar mensagem do seu handler
            let errorMsg = "Error changing status.";
            try {
                const errorData = await response.json();
                if (errorData.message) {
                    errorMsg = errorData.message;
                }
            } catch {
                errorMsg = await response.text();
            }
            alert(errorMsg);
        }
    } catch (error) {
        console.error("Request error:", error);
        alert("Server connection error.");
    }
});
