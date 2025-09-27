"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const AboutCTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

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

      gsap.to(".cta-floating", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      const buttons = document.querySelectorAll(".cta-button");
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="cta-content">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your
            <br />
            <span className="text-yellow-300">Reading Journey?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of readers who have discovered their next favorite
            book with us. Start exploring our curated collection today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/books"
              className="cta-button px-8 py-4 bg-white text-[#F86D72] rounded-full font-bold text-lg hover:bg-yellow-100 transition-all duration-300 hover:shadow-xl"
            >
              Browse Books
            </Link>
            <Link
              href={isAuthenticated ? "/" : "/login"}
              className="cta-button px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#F86D72] rounded-full font-bold text-lg transition-all duration-300 hover:shadow-xl"
            >
              Join Community
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="font-semibold">5000+ Books</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <span className="font-semibold">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
