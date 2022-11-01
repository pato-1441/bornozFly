const getProducts = async () => {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const renderProducts = async () => {
  const productsContainer = document.getElementById("productsContainer");

  const products = await getProducts();

  productsContainer.innerHTML = products
    .map((prod) => `<div><p>${prod.title}</p><p>$${prod.price}</p></div>`)
    .join(" ");
};

renderProducts();
