"use client";

import React from "react";

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

interface BookPageClientProps {
  book: Book;
  relatedBooks: Book[];
  error: string | null;
}

const BookPageClient = ({ book, relatedBooks, error }: BookPageClientProps) => {
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Book Details
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#F86D72] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#dd6165] transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // This component can be used for any client-side functionality
  // For now, it just handles error states
  return null;
};

export default BookPageClient;
