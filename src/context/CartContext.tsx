import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Stock available
  cartQuantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load Cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save Cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === newItem.id);
      if (existingItem) {
        // Check stock before adding
        if (existingItem.cartQuantity + 1 > newItem.quantity) {
          alert(`Estoque insuficiente! Apenas ${newItem.quantity} unidades disponíveis.`);
          return prevItems;
        }
        return prevItems.map(i =>
          i.id === newItem.id ? { ...i, cartQuantity: i.cartQuantity + 1 } : i
        );
      }
      return [...prevItems, { ...newItem, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          // Check stock limit
          if (quantity > item.quantity) {
            alert(`Quantidade máxima atingida! Estoque: ${item.quantity}`);
            return item;
          }
          return { ...item, cartQuantity: quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
};
