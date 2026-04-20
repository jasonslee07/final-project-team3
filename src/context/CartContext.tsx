import React, { createContext, useContext, useState, ReactNode } from "react";
import { type Item } from "../types/types";

interface CartContextType {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (title: string) => void;
}

// 1. Pass undefined but cast to the type so TS doesn't complain
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (title: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  return (
    // 2. You forgot to include removeFromCart in the provider value
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
