// Sacred Scrubs — cart storage helpers
// Cart is stored in the browser's localStorage so it survives between pages.
// Each cart item looks like:
// { productId, name, flavor, size, application, unitPrice, qty, image }

const CART_KEY = "sacredScrubsCart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  // Merge with an identical existing line (same product + same options)
  const existing = cart.find(
    (c) =>
      c.productId === item.productId &&
      c.flavor === item.flavor &&
      c.size === item.size &&
      c.application === item.application
  );
  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, qty);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

function formatPrice(amount) {
  return "R" + amount.toFixed(2).replace(/\.00$/, "");
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = cartCount();
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
