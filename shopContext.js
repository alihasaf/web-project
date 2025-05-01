import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add to cart: if item exists, increase quantity, else add new
  const addToCart = (item) => setCart(prev => {
    const idx = prev.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      return prev.map((i, j) => j === idx ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
    }
    return [...prev, { ...item, quantity: item.quantity || 1 }];
  });

  // Remove from cart
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  // Update quantity
  const updateCartQty = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));

  // Clear cart
  const clearCart = () => setCart([]);

  // Wishlist: add, remove
  const addToWishlist = (item) => setWishlist(prev => {
    if (prev.find(i => i.id === item.id)) return prev;
    return [...prev, item];
  });
  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(i => i.id !== id));

  return (
    <ShopContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateCartQty, clearCart,
      addToWishlist, removeFromWishlist
    }}>
      {children}
    </ShopContext.Provider>
  );
}
