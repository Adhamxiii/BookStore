"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  book: string | { _id: string; title?: string; price?: number; discountPercent?: number };
  quantity: number;
  discountPercent: number;
  price: number;
};

type Cart = {
  _id?: string;
  user?: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
};

type CartActionResult = { success: boolean; data: any; error?: string | null };

type CartContextType = {
  cart: Cart | null;
  setCart: (c: Cart | null) => void;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<CartActionResult>;
  addToCart: (bookId: string) => Promise<CartActionResult>;
  updateCart: (bookId: string, quantity: number) => Promise<CartActionResult>;
  deleteFromCart: (bookId: string) => Promise<CartActionResult>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const refresh = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/carts`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to fetch cart");
        setCart(null);
        return {
          success: false,
          data,
          error: data?.message || "Failed to fetch cart",
        };
      }
      setCart(data?.data || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err?.message || "Failed to fetch cart");
      setCart(null);
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to fetch cart",
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addToCart = async (bookId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/carts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to add to cart");
        return {
          success: false,
          data,
          error: data?.message || "Failed to add to cart",
        };
      }
      setCart(data?.data || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err?.message || "Failed to add to cart");
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to add to cart",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (bookId: string, quantity: number) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/carts/${bookId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to update cart");
        return {
          success: false,
          data,
          error: data?.message || "Failed to update cart",
        };
      }
      setCart(data?.data || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err?.message || "Failed to update cart");
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to update cart",
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteFromCart = async (bookId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/carts/${bookId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Failed to remove from cart");
        return {
          success: false,
          data,
          error: data?.message || "Failed to remove from cart",
        };
      }
      setCart(data?.data || null);
      setError(null);
      return { success: true, data };
    } catch (err: any) {
      setError(err?.message || "Failed to remove from cart");
      return {
        success: false,
        data: null,
        error: err?.message || "Failed to remove from cart",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        error,
        refresh,
        addToCart,
        updateCart,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
