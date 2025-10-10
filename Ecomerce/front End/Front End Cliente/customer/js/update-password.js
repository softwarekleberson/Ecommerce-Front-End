document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("id");

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/customers/${clientId}/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ password, confirmPassword })
        });

        if (!response.ok) {
            let errorMsg = "Error updating password";

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

        // Sucesso
        alert("Password updated successfully!");
        document.getElementById("form").reset();
        window.location.href = "index.html";

    } catch (error) {
        console.error("Unexpected error:", error);
        alert("Server connection failure.");
    }
});
