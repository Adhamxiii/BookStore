"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

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

interface RelatedBooksProps {
  relatedBooks: Book[];
}

const RelatedBooks = ({ relatedBooks }: RelatedBooksProps) => {
  const relatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Related books section animation
      gsap.fromTo(
        ".related-section",
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
            trigger: relatedRef.current,
            start: "top 80%",
          },
        }
      );

      // Related book cards animation
      gsap.fromTo(
        ".related-book",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

    }, relatedRef);

    return () => ctx.revert();
  }, []);

  if (relatedBooks.length === 0) {
    return null;
  }

  return (
    <div ref={relatedRef} className="mb-20">
      {/* Section Header */}
      <div className="related-section text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          You Might Also Like
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover more amazing books in the same category
        </p>
      </div>

      {/* Related Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedBooks.map((book, index) => (
          <Link key={book._id} href={`/books/${book._id}`} className="block">
            <div className="related-book group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {book.isFeatured && (
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    ⭐ Featured
                  </span>
                )}
                {book.isOnSale && (
                  <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    🔥 -{book.discountPercent}%
                  </span>
                )}
              </div>

              {/* Image */}
              <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={
                    book.coverImage?.startsWith("http")
                      ? book.coverImage
                      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/images/${book.coverImage}`
                  }
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#F86D72] transition-colors duration-300">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{book.author}</p>
                
                {/* Price */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl font-bold text-[#F86D72]">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.isOnSale && (
                    <span className="text-sm text-gray-500 line-through">
                      ${(book.price / (1 - book.discountPercent! / 100)).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                </div>

                {/* View Details */}
                <div className="flex items-center justify-center text-gray-400 group-hover:text-[#F86D72] transition-colors duration-300">
                  <span className="text-sm font-medium mr-2">View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          href="/books"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View All Books
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedBooks;
