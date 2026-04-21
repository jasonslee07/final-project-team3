/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import { type Item } from "../types/types";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase";

interface CartContextType {
  addToCart: (item: Item) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();

  const addToCart = async (item: Item) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, "items", item.id), {
        status: "Carted",
        cartedBy: currentUser.uid,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, "items", itemId), {
        status: "Active",
        cartedBy: null,
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return <CartContext.Provider value={{ addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
