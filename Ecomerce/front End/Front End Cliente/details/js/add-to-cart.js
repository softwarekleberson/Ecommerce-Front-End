document.addEventListener("DOMContentLoaded", () => {
  const botaoAdicionar = document.getElementById("adicionar-carrinho");

  botaoAdicionar.addEventListener("click", async (event) => {
    event.preventDefault();

    // Pegando os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("customerId");
    const productId = urlParams.get("id");

    if (!customerId || !productId) {
      alert("Error: Unable to identify customer or product.");
      return;
    }

    // Corpo da requisição
    const body = {
      customerId: customerId,
      productId: productId,
      quantity: 1
    };

    try {
      const response = await fetch("http://localhost:8080/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Error request: ${response.status}`);
      }

      const data = await response.json();
      console.log("Produto adicionado ao carrinho:", data);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("An error occurred while adding the product to the cart.");
    }
  });
});
