document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".container");

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const customerId = urlParams.get("id");

        if (!customerId) {
            container.innerHTML = `<p style="color:red;">Customer not identified in URL 😢</p>`;
            return;
        }

        const response = await fetch(`http://localhost:8080/customers/${customerId}/voucher`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const vouchers = await response.json();

        vouchers.forEach(voucher => {
            const voucherDiv = document.createElement("div");
            voucherDiv.classList.add("voucher-item");
            voucherDiv.innerHTML = `
                <h4>Id : ${voucher.voucherId}</h4>
                <p>Message : ${voucher.message}</p>
                <p>${voucher.typeVoucher}</p>
                <h4>$ : ${voucher.discount} Dolares</h4>
            `;
            container.appendChild(voucherDiv);
        });

    } catch (error) {
        console.error("Error loading vouchers:", error);
        container.innerHTML += `<p style="color:red;">Error loading vouchers 😢</p>`;
    }
});
