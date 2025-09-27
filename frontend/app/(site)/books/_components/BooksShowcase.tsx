"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Award, BookOpen, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
}

interface Category {
  _id: string;
  name: string;
}

interface BooksShowcaseProps {
  books: Book[];
  categories: Category[];
}

const BooksShowcase = ({ books, categories }: BooksShowcaseProps) => {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);

  useEffect(() => {
    const featured = books.filter((book) => book.isFeatured).slice(0, 3);
    setFeaturedBooks(featured);

    const trending = books
      .filter((book) => book.isOnSale || book.discountPercent)
      .slice(0, 4);
    setTrendingBooks(trending);
  }, [books]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-section",
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".featured-book",
        {
          opacity: 0,
          y: 80,
          rotationY: 20,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".featured-section",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".trending-book",
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
            trigger: ".trending-section",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".category-card",
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".categories-section",
            start: "top 85%",
          },
        }
      );

      gsap.to(".showcase-floating", {
        y: -20,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={showcaseRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="showcase-floating absolute top-20 left-20 w-32 h-32 bg-[#F86D72]/5 rounded-full blur-xl" />
        <div className="showcase-floating absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/5 rounded-full blur-xl" />
        <div className="showcase-floating absolute bottom-20 left-1/4 w-24 h-24 bg-[#F86D72]/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="showcase-section featured-section mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white px-6 py-3 rounded-full text-sm font-bold mb-4">
              <Award className="w-5 h-5" />
              Featured Collection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Handpicked Favorites
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of must-read books that
              have captured readers&apos; hearts worldwide.
            </p>
          </div>

          {featuredBooks.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBooks.map((book) => (
                <Link
                  key={book._id}
                  href={`/books/${book._id}`}
                  className="block"
                >
                  <div className="featured-book group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100">
                    <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
                      <Image
                        src={
                          book.coverImage?.startsWith("http")
                            ? book.coverImage
                            : `${
                                process.env.NEXT_PUBLIC_API_URL ||
                                "http://localhost:3001"
                              }/images/${book.coverImage}`
                        }
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#F86D72] transition-colors duration-300">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {book.author}
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-[#F86D72]">
                          ${book.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-center text-[#F86D72] text-sm font-medium">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="showcase-section trending-section mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-4">
              <TrendingUp className="w-5 h-5" />
              Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hot Deals & Bestsellers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don&apos;t miss out on these amazing deals and trending titles that
              everyone&apos;s talking about.
            </p>
          </div>

          {trendingBooks.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingBooks.map((book) => (
                <Link
                  key={book._id}
                  href={`/books/${book._id}`}
                  className="block"
                >
                  <div className="trending-book group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
                    <div className="relative h-32 mb-3 rounded-xl overflow-hidden">
                      <Image
                        src={
                          book.coverImage?.startsWith("http")
                            ? book.coverImage
                            : `${
                                process.env.NEXT_PUBLIC_API_URL ||
                                "http://localhost:3001"
                              }/images/${book.coverImage}`
                        }
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {book.isOnSale && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          -{book.discountPercent}%
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#F86D72] transition-colors duration-300">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {book.author}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#F86D72]">
                          ${book.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-500">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="showcase-section categories-section">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-4">
              <BookOpen className="w-5 h-5" />
              Explore Categories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Next Read
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our diverse collection of book categories and
              discover your next favorite genre.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category._id} href={`/books`} className="block">
                <div className="category-card group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F86D72] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Explore Collection
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksShowcase;
