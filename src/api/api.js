import { UserAuthService } from "../utils/userAuthService";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Public endpoints (no auth needed)
export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const json = await response.json();
  return json.data; // assuming shape { data: [...] }
}

// Protected: create a new cart with initial products
export async function createCart(products) {
  const response = await UserAuthService.authenticatedRequest(
    `${API_BASE}/carts`,
    {
      method: "POST",
      body: JSON.stringify({ products }),
    },
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create cart");
  }
  const json = await response.json();
  return json.data; // { id, ... }
}

// Protected: add product to existing cart
export async function addToCart(cartId, productId, quantity = 1) {
  const response = await UserAuthService.authenticatedRequest(
    `${API_BASE}/carts/${cartId}/add`,
    {
      method: "POST",
      body: JSON.stringify({ products: [{ product_id: productId, quantity }] }),
    },
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to add to cart");
  }
  return await response.json();
}
