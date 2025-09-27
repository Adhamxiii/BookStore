"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";

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

interface BooksGridProps {
  books: Book[];
  view: "grid" | "list";
  loading: boolean;
}

const BooksGrid = ({ books, view, loading }: BooksGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (books.length > 0) {
      setDisplayedBooks([]);

      books.forEach((book, index) => {
        setTimeout(() => {
          setDisplayedBooks((prev) => [...prev, book]);
        }, index * 100);
      });
    }
  }, [books]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  if (loading) {
    return (
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse"
          >
            <div className="h-64 bg-gray-200" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div ref={gridRef} className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            No Books Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find any books matching your criteria. Try
            adjusting your filters or search terms.
          </p>
          <button className="bg-[#F86D72] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#dd6165] transition-colors duration-300">
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={gridRef}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {books.length} Book{books.length !== 1 ? "s" : ""} Found
          </h2>
          <p className="text-gray-600 mt-1">
            Discover amazing books from our collection
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Showing {displayedBooks.length} of {books.length}
          </div>
        </div>
      </div>

      <div
        className={`grid gap-8 ${
          view === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {displayedBooks.map((book, index) => (
          <BookCard key={book._id} book={book} index={index} />
        ))}
      </div>

      {books.length > displayedBooks.length && (
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
            Load More Books
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksGrid;
