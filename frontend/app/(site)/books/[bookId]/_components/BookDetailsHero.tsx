"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Star, Award, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

interface BookDetailsHeroProps {
  book: Book;
}

const BookDetailsHero = ({ book }: BookDetailsHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createParticles = () => {
        const particles = [];
        for (let i = 0; i < 80; i++) {
          const particle = document.createElement("div");
          particle.className = "book-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, #F86D72, #ff9aa1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            pointer-events: none;
          `;
          particlesRef.current?.appendChild(particle);
          particles.push(particle);
        }
        return particles;
      };

      const particles = createParticles();

      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 300 - 150}`,
          y: `+=${Math.random() * 300 - 150}`,
          duration: Math.random() * 15 + 8,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });

        gsap.to(particle, {
          rotation: 360,
          duration: Math.random() * 25 + 15,
          ease: "none",
          repeat: -1,
        });
      });

      gsap.fromTo(
        ".hero-content",
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".book-image",
        {
          opacity: 0,
          scale: 0.5,
          rotationY: 45,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.8,
          ease: "back.out(1.7)",
          delay: 0.6,
        }
      );

      gsap.to(".hero-floating", {
        y: -30,
        x: 20,
        rotation: 180,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 3,
          from: "random",
        },
      });

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          backgroundPosition: "200% 200%",
          duration: 30,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

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
    <section
      ref={heroRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F86D72]/10 via-white to-[#ff9aa1]/10"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(248, 109, 114, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 154, 161, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(248, 109, 114, 0.08) 0%, transparent 50%)
        `,
        backgroundSize: "400% 400%",
      }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-floating absolute top-20 left-10 w-32 h-32 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="hero-floating absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        <div className="hero-floating absolute bottom-20 left-1/4 w-28 h-28 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="hero-floating absolute bottom-40 right-1/3 w-36 h-36 bg-[#ff9aa1]/10 rounded-full blur-xl" />
      </div>

      <Link
        href="/books"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-[#F86D72] transition-all duration-300 shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Books
      </Link>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content text-center lg:text-left">
            <div className="relative inline-block">
              <div className="book-image relative w-130 h-96 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={
                    book.coverImage?.startsWith("http")
                      ? book.coverImage
                      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/images/${book.coverImage}`
                  }
                  alt={book.title}
                  fill
                  className="object-cover"
                />
                
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

                <div className="absolute inset-0 bg-gradient-to-br from-[#F86D72]/20 to-[#ff9aa1]/20 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          <div className="hero-content text-center lg:text-left">
            <div className="mb-6">
              {book.category && (
                <span className="inline-block bg-[#F86D72]/10 text-[#F86D72] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {book.category.name}
                </span>
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {book.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-6 flex items-center justify-center lg:justify-start gap-2">
                <User className="w-6 h-6 text-[#F86D72]" />
                by {book.author}
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-700">4.8</span>
              <span className="text-gray-500">(1,234 reviews)</span>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <span className="text-5xl font-bold text-[#F86D72]">
                ${priceInfo.discounted.toFixed(2)}
              </span>
              {book.isOnSale && (
                <span className="text-2xl text-gray-500 line-through">
                  ${priceInfo.original.toFixed(2)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {book.pages && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#F86D72]" />
                  <span>{book.pages} pages</span>
                </div>
              )}
              {book.language && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-5 h-5 text-[#F86D72]" />
                  <span>{book.language}</span>
                </div>
              )}
            </div>

            {book.stock !== undefined && (
              <div className="mb-8">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsHero;
