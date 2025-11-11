document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You need to log in first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/customer/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        if (!response.ok) {
            throw new Error("Error searching for client: " + response.status);
        }

        const cliente = await response.json();

        document.getElementById("name").value = cliente.name || "";
        document.getElementById("birth").value = cliente.birth
            ? cliente.birth.split("T")[0]
            : "";
        document.getElementById("ddd").value = cliente.phone.ddd || "";
        document.getElementById("phone").value = cliente.phone.phone || "";
        document.getElementById("typePhone").value = cliente.phone.typePhone || "MOBILE";

    } catch (error) {
        console.error("Error loading client:", error);
        alert("Error loading client data. Try again later.");
        window.location.href = "login.html";
    }
});
