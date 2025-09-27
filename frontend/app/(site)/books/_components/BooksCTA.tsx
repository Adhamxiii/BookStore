"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const BooksCTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".cta-button",
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
          delay: 0.6,
        }
      );

      gsap.to(".cta-floating", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="py-20 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="cta-floating absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="cta-floating absolute top-40 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl" />
        <div className="cta-floating absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="cta-floating absolute bottom-40 right-1/3 w-36 h-36 bg-white/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="cta-content text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join Our Reading Community
            <br />
            <span className="text-yellow-300">Start Your Journey Today!</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Become part of our amazing community of book lovers. Discover new
            favorites, share reviews, and connect with fellow readers.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/register"
              className="cta-button px-8 py-4 bg-white text-[#F86D72] rounded-full font-bold text-lg hover:bg-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <BookOpen className="w-5 h-5" />
              Join Community
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/about"
              className="cta-button px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#F86D72] rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="stat-item text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
            <p className="text-white/80">Books Available</p>
          </div>

          <div className="stat-item text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">10K+</h3>
            <p className="text-white/80">Happy Readers</p>
          </div>

          <div className="stat-item text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">4.9/5</h3>
            <p className="text-white/80">Average Rating</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center text-white/80">
            <div className="text-2xl mb-2">📚</div>
            <span className="font-semibold">Curated Selection</span>
          </div>
          <div className="text-center text-white/80">
            <div className="text-2xl mb-2">🚚</div>
            <span className="font-semibold">Free Shipping</span>
          </div>
          <div className="text-center text-white/80">
            <div className="text-2xl mb-2">💬</div>
            <span className="font-semibold">24/7 Support</span>
          </div>
          <div className="text-center text-white/80">
            <div className="text-2xl mb-2">⭐</div>
            <span className="font-semibold">Quality Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksCTA;
