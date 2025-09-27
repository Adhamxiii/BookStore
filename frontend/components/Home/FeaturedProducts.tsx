"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Book } from "@/types/book";
import { Loader2, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContex";
import toast from "react-hot-toast";

const FeaturedProducts = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${apiBase}/api/books`)
      .then((res) => res.json())
      .then((data) => setBookList(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [apiBase]);

  const handleAddToCart = async (bookId: string) => {
    setPendingId(bookId);
    const result = await addToCart(bookId);
    if (result.success) {
      toast.success("Book added to cart");
      setBookList((prev) =>
        prev.map((b) =>
          b._id === bookId ? { ...b, stock: Math.max(0, (b.stock || 0) - 1) } : b
        )
      );
    } else {
      toast.error(result.error || "Failed to add book to cart");
    }
    setPendingId(null);
  };

  const featuredBooks = bookList.filter((book) => book?.isFeatured);

  return (
    <section className="py-10">
      <div className="relative mb-10 flex flex-col items-center text-center gap-3">
        <div
          className="pointer-events-none absolute -inset-x-10 -top-10 h-40 blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, #F86D72 0%, transparent 70%)",
          }}
        />

        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-gray-700 bg-white/80 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-[#F86D72]" />
          Top Picks this Week
        </span>

        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#F86D72] via-[#ff9aa1] to-[#F86D72] bg-clip-text text-transparent">
            Featured Products
          </span>
        </h3>
        <p className="text-sm text-gray-600 max-w-2xl">
          Handpicked books we think you’ll love.
        </p>
        <span className="mt-1 inline-block h-1 w-24 rounded-full bg-[#F86D72]" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="relative w-full aspect-[4/3] rounded-xl bg-gray-100 animate-pulse" />
              <div className="mt-4 h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="mt-2 h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
              <div className="mt-4 h-8 w-full bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : featuredBooks.length === 0 ? (
        <div className="text-center py-16 border rounded-2xl bg-white">
          <p className="text-gray-600">
            No featured books available right now. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => {
            const isOnSale = Boolean(book?.isOnSale);
            const discountPercent =
              parseFloat(String(book?.discountPercent || 0)) || 0;
            const price = Number(book?.price || 0);
            const discounted =
              isOnSale && discountPercent > 0
                ? Number((price * (1 - discountPercent / 100)).toFixed(2))
                : price;

            return (
              <div
                key={book?._id}
                className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Badges */}
                <div className="absolute left-3 top-3 z-10 flex gap-2">
                  {book?.isFeatured && (
                    <span className="rounded-full bg-[#F86D72]/10 text-[#F86D72] px-3 py-1 text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {isOnSale && (
                    <span className="rounded-full bg-green-500/10 text-green-600 px-3 py-1 text-xs font-medium">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                  {book?.coverImage && (
                    <Image
                      src={book?.coverImage?.startsWith("https")
                        ? book.coverImage
                        : `${apiBase}/images/${book?.coverImage}`}
                      alt={book?.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {!book?.coverImage && (
                    <div className="w-full h-full bg-gray-50" />
                  )}
                </div>

                {/* Content */}
                <div className="mt-4 space-y-1">
                  <h4 className="line-clamp-1 text-base font-semibold">
                    {book?.title}
                  </h4>
                  <p className="line-clamp-1 text-sm text-gray-600">
                    {book?.author}
                  </p>

                  <div className="flex items-end justify-between">
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-semibold text-[#F86D72]">
                        ${discounted}
                      </span>
                      {isOnSale && (
                        <span className="text-sm text-gray-500 line-through">
                          ${price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Stock: {book?.stock}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full bg-[#F86D72] hover:bg-[#dd6165] text-white disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl"
                    onClick={() => handleAddToCart(book?._id)}
                    disabled={pendingId === book?._id || book?.stock <= 0}
                  >
                    {book?.stock <= 0 ? (
                      "Out of Stock"
                    ) : pendingId === book?._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
