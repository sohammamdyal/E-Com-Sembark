// api.js
const BASE = "https://fakestoreapi.com";

// 📌 Fetch all products
export async function fetchProducts(params = {}) {
  const res = await fetch(`${BASE}/products`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

// 📌 Fetch single product
export async function fetchProductById(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  return await res.json();
}

// 📌 Fetch categories
export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
