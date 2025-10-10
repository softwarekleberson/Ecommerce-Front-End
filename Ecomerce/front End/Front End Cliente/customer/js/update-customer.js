document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("id");

    const formData = {
        name: document.getElementById("name").value,
        birth: document.getElementById("birth").value,
        ddd: document.getElementById("ddd").value,
        phone: document.getElementById("phone").value,
        typePhone: document.getElementById("typePhone").value
    };

    try {
        const response = await fetch(`http://localhost:8080/customers/${clientId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") 
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error updating client");
        }

        alert("client updated successfully!");
        document.getElementById("form").reset();
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error updating client:", error);
        alert("Unable to update client.");
    }
});
