"use client";

import { useCart } from "@/context/CartContex";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export type Item = {
  book:
    | {
        _id: string;
        title?: string;
        price?: number;
        coverImage?: string | null;
        isOnSale: boolean;
        discountPercent: string;
      }
    | string;
  quantity: number;
  price: number;
};

const CartItem = ({ item }: { item: Item }) => {
  const { updateCart, deleteFromCart } = useCart();
  const [pending, setPending] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const bookId = typeof item.book === "string" ? item.book : item.book?._id;
  const title =
    typeof item.book === "string" ? "Book" : item.book?.title || "Book";
  const cover =
    typeof item.book === "string" ? undefined : item.book?.coverImage;
  const stock =
    typeof item.book === "string"
      ? undefined
      : (item.book as { stock?: number })?.stock;

  const isOnSale =
    typeof item.book === "string"
      ? false
      : Boolean((item.book as { isOnSale?: boolean })?.isOnSale);
  const discountPercent =
    typeof item.book === "string"
      ? 0
      : parseFloat(
          String(
            (
              item.book as {
                discountPercent?: string | number;
              }
            )?.discountPercent || 0
          )
        ) || 0;
  const price = Number(item.price || 0);
  const discounted =
    isOnSale && discountPercent > 0
      ? Number((price * (1 - discountPercent / 100)).toFixed(2))
      : price;

  const changeQty = async (next: number) => {
    if (next < 0) return;
    if (next > (item.quantity || 0) && (stock ?? 0) <= 0) {
      toast.error("Out of stock");
      return;
    }
    setPending(true);
    const res = await updateCart(bookId, next);
    if (!res.success) {
      toast.error(res.error || "Failed to update cart");
    }
    setPending(false);
  };

  const remove = async () => {
    setPending(true);
    const res = await deleteFromCart(bookId);
    if (!res.success) {
      toast.error(res.error || "Failed to remove item");
    } else {
      toast.success("Removed from cart");
    }
    setPending(false);
  };

  console.log(item);

  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-gray-50">
        {cover ? (
          <Image
            src={
              cover?.startsWith("https") ? cover : `${apiBase}/images/${cover}`
            }
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-base font-semibold line-clamp-1">{title}</h4>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-semibold text-[#F86D72]">
                ${discounted}
              </span>
              {isOnSale && discountPercent > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  ${price}
                </span>
              )}
              {isOnSale && discountPercent > 0 && (
                <span className="rounded-full bg-green-500/10 text-green-600 px-2 py-0.5 text-[10px] font-medium">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </div>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={remove}
            disabled={pending}
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 inline-flex items-center rounded-full border px-2">
          <button
            className="p-2 disabled:opacity-50 cursor-pointer"
            onClick={() => changeQty(item.quantity - 1)}
            disabled={pending || item.quantity <= 0}
            aria-label="Decrease quantity "
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 text-sm">{item.quantity}</span>
          <button
            className="p-2 disabled:opacity-50 cursor-pointer"
            onClick={() => changeQty(item.quantity + 1)}
            disabled={pending || (stock ?? 0) <= 0}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
