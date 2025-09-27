"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

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

interface BookReviewsProps {
  book: Book;
}

const BookReviews = ({}: BookReviewsProps) => {
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely loved this book! The story is captivating and the writing style is beautiful. Highly recommend to anyone looking for a great read.",
      likes: 24,
      avatar: "SJ"
    },
    {
      id: 2,
      user: "Michael Chen",
      rating: 4,
      date: "2024-01-12",
      comment: "Great book with interesting characters and plot twists. The author did a fantastic job creating an immersive world.",
      likes: 18,
      avatar: "MC"
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      rating: 5,
      date: "2024-01-10",
      comment: "One of the best books I've read this year! The character development is outstanding and the ending was perfect.",
      likes: 31,
      avatar: "ER"
    },
    {
      id: 4,
      user: "David Thompson",
      rating: 4,
      date: "2024-01-08",
      comment: "Really enjoyed this book. The pacing is good and the themes are thought-provoking. Would definitely read more from this author.",
      likes: 15,
      avatar: "DT"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reviews section animation
      gsap.fromTo(
        ".reviews-section",
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
            trigger: reviewsRef.current,
            start: "top 80%",
          },
        }
      );

      // Review cards animation
      gsap.fromTo(
        ".review-card",
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
            trigger: reviewsRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

    }, reviewsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={reviewsRef} className="mb-20">
      {/* Reviews Header */}
      <div className="reviews-section text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Readers Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover what our community thinks about this amazing book
        </p>
        
        {/* Overall Rating */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-3xl font-bold text-gray-900">4.8</span>
          <span className="text-gray-600">(1,234 reviews)</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="review-card bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{review.user}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < review.rating 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {review.comment}
            </p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#F86D72] transition-colors duration-300">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{review.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-[#F86D72] transition-colors duration-300">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReviews;
