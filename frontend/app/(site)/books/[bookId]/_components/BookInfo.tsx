"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContex";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, BookOpen, Calendar, Share2, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  isOnSale?: boolean;
  discountPercent?: number;
  isFeatured?: boolean;
  stock?: number;
  createdAt?: string;
  category?: {
    _id: string;
    name: string;
  };
  description?: string;
  pages?: number;
  language?: string;
  publisher?: string;
  isbn?: string;
}

interface BookInfoProps {
  book: Book;
}

const BookInfo = ({ book }: BookInfoProps) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-section",
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".info-card",
        {
          opacity: 0,
          x: -50,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );
    }, infoRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }

    setIsAdding(true);
    try {
      const result = await addToCart(book._id);
      if (result.success) {
        toast.success("Added to cart!");
      } else {
        toast.error(result.error || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `Check out this amazing book: ${book.title} by ${book.author}`,
          url: window.location.href,
        });
      } catch (error) {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const calculatePrice = () => {
    if (book.isOnSale && book.discountPercent) {
      const discount = book.price * (book.discountPercent / 100);
      return {
        original: book.price,
        discounted: book.price - discount,
        discount: book.discountPercent,
      };
    }
    return { original: book.price, discounted: book.price, discount: 0 };
  };

  const priceInfo = calculatePrice();

  return (
    <div ref={infoRef} className="space-y-8">
      <div className="info-section bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#F86D72]" />
          About This Book
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          {book.description ||
            `Discover the captivating world of "${book.title}" by ${book.author}. This remarkable book takes readers on an unforgettable journey through compelling narratives and thought-provoking themes. A must-read for anyone seeking inspiration and entertainment.`}
        </p>
      </div>

      <div className="info-section bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#F86D72]" />
          Book Details
        </h2>
        <div className="">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Author & Category
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Author:</span>
                <span className="font-semibold">{book.author}</span>
              </div>
              {book.category && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold">{book.category.name}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold text-yellow-600">4.8/5 ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section bg-gradient-to-br from-[#F86D72]/5 to-[#ff9aa1]/5 rounded-3xl p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-[#F86D72]" />
          Book Preview & Quality
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Physical Quality
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">High-quality print</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Premium paper quality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Durable binding</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Eco-friendly materials</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Content Quality
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-600">Expertly edited</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-600">Clear typography</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-gray-600">Professional layout</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600">Reader-friendly format</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section bg-gradient-to-br from-[#F86D72]/5 to-[#ff9aa1]/5 rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold text-[#F86D72]">
                ${priceInfo.discounted.toFixed(2)}
              </span>
              {book.isOnSale && (
                <span className="text-xl text-gray-500 line-through">
                  ${priceInfo.original.toFixed(2)}
                </span>
              )}
            </div>
            {book.isOnSale && (
              <span className="text-sm text-green-600 font-semibold">
                You save ${priceInfo.original - priceInfo.discounted} (
                {book.discountPercent}% off)
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || (book.stock ?? 0) <= 0}
            className="flex-1 bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] hover:from-[#dd6165] hover:to-[#ff8a95] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            {isAdding ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        {book.stock !== undefined && (
          <div className="mt-6 text-center">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                book.stock > 10
                  ? "bg-green-100 text-green-700"
                  : book.stock > 0
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.stock > 10
                ? "✅ In Stock - Ready to Ship"
                : book.stock > 0
                ? `⚠️ Only ${book.stock} copies left`
                : "❌ Out of Stock"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookInfo;
