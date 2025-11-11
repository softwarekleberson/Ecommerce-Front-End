document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to change your password.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/customer/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ password, confirmPassword })
        });

        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                alert("Your session has expired. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "login.html";
                return;
            }

            let errorMsg = "Error updating password.";
            try {
                const data = await response.json();
                errorMsg = data.message || data.error || errorMsg;
            } catch {
                const text = await response.text();
                if (text) errorMsg = text;
            }

            alert(errorMsg);
            return;
        }

        alert("Password updated successfully!");
        document.getElementById("form").reset();
        window.location.href = "index.html";

    } catch (error) {
        console.error("Unexpected error:", error);
        alert("Server connection failure.");
        window.location.href = "login.html";
    }
});
