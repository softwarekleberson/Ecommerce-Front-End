document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("id");

    try {
        const response = await fetch(`http://localhost:8080/customers/${clientId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") 
            }
        });

        if (!response.ok) {
            throw new Error("Error searching for client: " + response.status);
        }

        const cliente = await response.json();

        document.getElementById("name").value = cliente.name || "";
        document.getElementById("birth").value = cliente.birth || "";
        document.getElementById("ddd").value = cliente.phone.ddd || "";
        document.getElementById("phone").value = cliente.phone.phone || "";
        document.getElementById("typePhone").value = cliente.phone.typePhone || "MOBILE";

    } catch (error) {
        console.error("Error loading client:", error);
    }
});
