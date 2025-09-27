"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createParticles = () => {
        const particles = [];
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(45deg, #F86D72, #ff9aa1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.6 + 0.2};
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
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 10 + 5,
          ease: "none",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });

        gsap.to(particle, {
          rotation: 360,
          duration: Math.random() * 20 + 10,
          ease: "none",
          repeat: -1,
        });
      });

      const titleText = titleRef.current?.textContent || "";
      if (titleRef.current) {
        titleRef.current.innerHTML = titleText
          .split("")
          .map((char, i) => `<span class="char" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        const chars = titleRef.current.querySelectorAll(".char");
        
        gsap.set(chars, {
          opacity: 0,
          y: 100,
          rotationX: 90,
          transformOrigin: "50% 50% -50px",
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.05,
          delay: 0.5,
        });
      }

      const buttons = document.querySelectorAll(".magnetic-btn");
      buttons.forEach((button) => {
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect();
          const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
          const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });

      if (subtitleRef.current) {
        const text = subtitleRef.current.textContent || "";
        subtitleRef.current.textContent = "";
        
        gsap.to(subtitleRef.current, {
          duration: text.length * 0.05,
          ease: "none",
          delay: 2,
          onUpdate: function() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            if (subtitleRef.current) {
              subtitleRef.current.textContent = text.substring(0, currentLength);
            }
          },
        });
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotationY: 180,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            delay: 10,
          }
        );
      }

      gsap.to(".floating-element", {
        y: -30,
        x: 20,
        rotation: 360,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 2,
          from: "random",
        },
      });

      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          backgroundPosition: "200% 200%",
          duration: 20,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[120dvh] sm:min-h-screen mt-15 sm:mt-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F86D72]/5 via-white to-[#ff9aa1]/5"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(248, 109, 114, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 154, 161, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(248, 109, 114, 0.05) 0%, transparent 50%)
        `,
        backgroundSize: "400% 400%",
      }}
    >
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        <div className="floating-element absolute bottom-20 left-1/4 w-24 h-24 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="floating-element absolute bottom-40 right-1/3 w-28 h-28 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        
        <div className="floating-element absolute top-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-full blur-lg opacity-20" />
        <div className="floating-element absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-[#ff9aa1] to-[#F86D72] rounded-full blur-lg opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance"
        >
          About Our Story
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          We're passionate about connecting readers with amazing books and creating
          a community where stories come alive. Our mission is to make literature
          accessible, affordable, and enjoyable for everyone.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/books" className="magnetic-btn px-8 py-4 bg-[#F86D72] hover:bg-[#dd6165] text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
            <span className="relative z-10">Explore Our Books</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#dd6165] to-[#F86D72] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link href={isAuthenticated ? "/" : "/login"} className="magnetic-btn px-8 py-4 border-2 border-[#F86D72] text-[#F86D72] hover:bg-[#F86D72] hover:text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <span className="relative z-10">Join Our Community</span>
            <div className="absolute inset-0 bg-[#F86D72] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 border-2 border-[#F86D72] rounded-full flex justify-center relative">
          <div className="w-1 h-3 bg-[#F86D72] rounded-full mt-2" />
          <div className="absolute inset-0 border-2 border-[#F86D72] rounded-full animate-ping opacity-20" />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
