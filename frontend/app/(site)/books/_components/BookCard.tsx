"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight, BookOpen } from "lucide-react";
import { useCart } from "@/context/CartContex";
import { useAuth } from "@/context/AuthContext";
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
  category?: {
    _id: string;
    name: string;
  };
}

interface BookCardProps {
  book: Book;
  index: number;
}

const BookCard = ({ book, index }: BookCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 80,
          rotationY: 15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          delay: index * 0.15,
        }
      );

      // Hover effects
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -20,
            scale: 1.03,
            rotationY: 5,
            duration: 0.5,
            ease: "power2.out",
          });

          // Image zoom and glow effect
          const image = card.querySelector(".book-image");
          if (image) {
            gsap.to(image, {
              scale: 1.15,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Glow effect
          const glow = card.querySelector(".card-glow");
          if (glow) {
            gsap.to(glow, {
              opacity: 0.3,
              scale: 1.1,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          // Button slide up animation
          const addToCartBtn = card.querySelector(".add-to-cart-btn");
          if (addToCartBtn) {
            gsap.to(addToCartBtn, {
              y: -5,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          // Arrow animation
          const arrow = card.querySelector(".view-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: 5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
          });

          const image = card.querySelector(".book-image");
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          const glow = card.querySelector(".card-glow");
          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          const addToCartBtn = card.querySelector(".add-to-cart-btn");
          if (addToCartBtn) {
            gsap.to(addToCartBtn, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }

          const arrow = card.querySelector(".view-arrow");
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        // Continuous floating animation - REMOVED
        // gsap.to(card, {
        //   y: -10,
        //   duration: 6,
        //   ease: "power2.inOut",
        //   yoyo: true,
        //   repeat: -1,
        //   delay: index * 0.4,
        // });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
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
    <Link href={`/books/${book._id}`} className="block">
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,109,114,0.02) 100%)",
        }}
      >
        {/* Glow Effect */}
        <div className="card-glow absolute inset-0 bg-gradient-to-br from-[#F86D72]/20 to-[#ff9aa1]/20 rounded-3xl opacity-0 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {book.isFeatured && (
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              ⭐ Featured
            </span>
          )}
          {book.isOnSale && (
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              🔥 -{book.discountPercent}%
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className="relative h-72 overflow-hidden rounded-t-3xl">
          <Image
            src={
              book.coverImage?.startsWith("http")
                ? book.coverImage
                : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/images/${book.coverImage}`
            }
            alt={book.title}
            fill
            className="book-image object-cover transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          {book.category && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {book.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          {/* Title and Author */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#F86D72] transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F86D72]" />
              {book.author}
            </p>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#F86D72]">
                ${priceInfo.discounted.toFixed(2)}
              </span>
              {book.isOnSale && (
                <span className="text-sm text-gray-500 line-through font-medium">
                  ${priceInfo.original.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-1 font-medium">(4.8)</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || (book.stock ?? 0) <= 0}
            className="add-to-cart-btn w-full bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] hover:from-[#dd6165] hover:to-[#ff8a95] text-white py-3 px-6 rounded-2xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
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

          {/* Stock indicator */}
          {book.stock !== undefined && (
            <div className="mt-4 text-center">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                book.stock > 10 
                  ? "bg-green-100 text-green-700" 
                  : book.stock > 0 
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {book.stock > 10 ? "✅ In Stock" : book.stock > 0 ? `⚠️ Only ${book.stock} left` : "❌ Out of Stock"}
              </span>
            </div>
          )}

          {/* View Details Arrow */}
          <div className="mt-4 flex items-center justify-center text-gray-400 group-hover:text-[#F86D72] transition-colors duration-300">
            <span className="text-sm font-medium mr-2">View Details</span>
            <ArrowRight className="w-4 h-4 view-arrow transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
