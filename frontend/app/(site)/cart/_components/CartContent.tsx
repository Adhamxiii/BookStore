"use client";

import { useCart } from "@/context/CartContex";
import CartItem, { Item } from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

interface CartItem {
  _id?: string;
  book:
    | string
    | {
        _id: string;
        title?: string;
        price?: number;
        coverImage?: string | null;
        isOnSale?: boolean;
        discountPercent?: string | number;
        stock?: number;
      };
  quantity: number;
  price: number;
}

const CartContent = () => {
  const { cart, loading } = useCart();
  const isInitialLoading = loading && !cart;

  if (isInitialLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-4 shadow-sm animate-pulse h-32"
            />
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-6 shadow-sm animate-pulse h-64" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items?.length === 0) {
    return <EmptyCart />;
  }

  console.log(cart.items);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item, index) => (
          <CartItem key={index} item={item as Item} />
        ))}
      </div>
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
};

export default CartContent;
