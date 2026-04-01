let allProducts = [];

async function fetchProducts() {
  try {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();

    allProducts = data.products;
    displayProducts(allProducts);

  } catch (error) {
    console.log(error);
  }
}


function displayProducts(products) {
  let container = document.getElementById("products");

  container.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.thumbnail}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <p class="rating">⭐ ${p.rating}</p>
      <button onclick="addToCart('${p.title}')">Add to Cart</button>
    </div>
  `).join("");
}


function filterData() {
  let category = document.getElementById("category").value;
  let sort = document.getElementById("sort").value;
  let search = document.getElementById("search").value.toLowerCase();

  let filtered = [...allProducts];

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search)
    );
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function addToCart(title) {
  alert(title + " added to cart 🛒");
}

document.getElementById("category").addEventListener("change", filterData);
document.getElementById("sort").addEventListener("change", filterData);
document.getElementById("search").addEventListener("input", filterData);

fetchProducts();