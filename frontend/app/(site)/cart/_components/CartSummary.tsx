"use client";

import { useCart } from "@/context/CartContex";
import { Button } from "@/components/ui/button";

const CartSummary = () => {
  const { cart, loading } = useCart();

  const subtotal = cart?.totalPrice || 0;
  const delivery = subtotal > 0 ? 15 : 0;

  const discount =
    cart?.items.reduce((acc, item) => {
      let discountPercent = 0;
      if (
        typeof item.book === "object" &&
        item.book !== null &&
        "discountPercent" in item.book
      ) {
        discountPercent = parseFloat((item.book as any).discountPercent) || 0;
      }
      return acc + (item.price * item.quantity * discountPercent) / 100;
    }, 0) || 0;
  const total = subtotal - discount + delivery;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-gray-500">
            ${discount?.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${delivery}</span>
        </div>
        <div className="border-t pt-3 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-extrabold">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        className="mt-5 w-full rounded-xl"
        disabled={loading || subtotal === 0}
      >
        Go to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
