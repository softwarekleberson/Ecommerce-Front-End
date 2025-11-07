const tableBody = document.getElementById("customers-table-body");
const filterActiveBtn = document.getElementById("filter-active");
const filterInactiveBtn = document.getElementById("filter-inactive");
const filterAllBtn = document.getElementById("filter-all");
const searchInput = document.getElementById("search");

let allCustomers = []; // Armazena todos os clientes recebidos da API

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
}

function createTableRow(customer) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="px-4 py-2 border-b">${customer.id}</td>
        <td class="px-4 py-2 border-b">${customer.systemClientStatus ? "Yes" : "No"}</td>
        <td class="px-4 py-2 border-b">${formatDate(customer.birth)}</td>
        <td class="px-4 py-2 border-b">${customer.name}</td>
        <td class="px-4 py-2 border-b">${customer.gender}</td>
        <td class="px-4 py-2 border-b">${customer.email.email}</td>
        <td class="px-4 py-2 border-b">(${customer.phone.ddd}) ${customer.phone.phone}</td>
    `;
    return tr;
}

function renderCustomers(customers) {
    tableBody.innerHTML = "";
    if (customers.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-gray-500">No customers found</td></tr>`;
        return;
    }
    customers.forEach(customer => {
        tableBody.appendChild(createTableRow(customer));
    });
}

async function loadCustomers() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Authentication token not found. Please log in again.");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/adm", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Unable to fetch customers`);
        }

        allCustomers = await response.json();
        renderCustomers(allCustomers);
    } catch (error) {
        console.error("Error loading customers:", error);
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-red-500">Error loading customers</td></tr>`;
    }
}

// 🔍 Filtros
filterActiveBtn.addEventListener("click", () => {
    const activeCustomers = allCustomers.filter(c => c.systemClientStatus);
    renderCustomers(activeCustomers);
});

filterInactiveBtn.addEventListener("click", () => {
    const inactiveCustomers = allCustomers.filter(c => !c.systemClientStatus);
    renderCustomers(inactiveCustomers);
});

filterAllBtn.addEventListener("click", () => {
    renderCustomers(allCustomers);
});

// 🔎 Busca dinâmica
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allCustomers.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.email.email.toLowerCase().includes(query) ||
        c.phone.phone.includes(query)
    );
    renderCustomers(filtered);
});

// 🚀 Inicializa
window.addEventListener("DOMContentLoaded", loadCustomers);
