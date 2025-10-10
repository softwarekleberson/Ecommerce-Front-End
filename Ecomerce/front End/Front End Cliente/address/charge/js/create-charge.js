document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("id");

    const formData = {
        receiver: document.getElementById("receiver").value,
        zipCode: document.getElementById("zipCode").value,
        typeResidence: document.getElementById("typeResidence").value,
        streetType: document.getElementById("streetType").value,
        street: document.getElementById("street").value,
        number: document.getElementById("number").value,
        neighborhood: document.getElementById("neighborhood").value,
        observation: document.getElementById("observation").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        country: document.getElementById("country").value
    };

    try {
        const response = await fetch(`http://localhost:8080/customers/${clientId}/charges`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            let errorMsg = "Error saving address";

            try {
                const error = await response.json();
                if (error.message) {
                    errorMsg = error.message;
                } else if (error.error) {
                    errorMsg = error.error;
                }
            } catch (e) {
                console.warn("Error reading error response:", e);
            }

            alert(errorMsg);
            return;
        }

        alert("Address saved successfully!");
        document.getElementById("form").reset();
        window.location.href = "index.html";

    } catch (error) {
        console.error("Unexpected error:", error);
        alert("Server connection failure.");
    }
});
