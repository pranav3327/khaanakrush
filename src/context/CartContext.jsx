import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('khanakrush_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('khanakrush_cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    setCart((prev) => {
      // Check for matching ID AND matching flavor
      const idx = prev.findIndex((p) => p.id === item.id && p.flavor === item.flavor);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [
        ...prev, 
        { 
          id: item.id, 
          name: item.name, 
          price: item.price, 
          quantity: 1, 
          image_url: item.image_url,
          flavor: item.flavor || null 
        }
      ];
    });
  }

  function inc(item) {
    setCart((prev) => prev.map((p) => (p.id === item.id && p.flavor === item.flavor ? { ...p, quantity: p.quantity + 1 } : p)));
  }

  function dec(item) {
    setCart((prev) =>
      prev
        .map((p) => (p.id === item.id && p.flavor === item.flavor ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
        .filter(Boolean)
    );
  }

  function remove(item) {
    setCart((prev) => prev.filter((p) => !(p.id === item.id && p.flavor === item.flavor)));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, inc, dec, remove, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
