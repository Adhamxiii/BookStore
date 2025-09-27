"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Shield, Star, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AdminProfileHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const createParticles = () => {
        const particles = [];
        for (let i = 0; i < 60; i++) {
          const particle = document.createElement("div");
          particle.className = "admin-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: linear-gradient(45deg, #F86D72, #ff9aa1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.6 + 0.2};
            pointer-events: none;
          `;
          particlesRef.current?.appendChild(particle);
          particles.push(particle);
        }
        return particles;
      };

      const particles = createParticles();

      // Animate particles
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 10 + 5,
          ease: "power2.inOut",
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

      // Hero content animation
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

      // Admin badge animation
      gsap.fromTo(
        ".admin-badge",
        {
          opacity: 0,
          scale: 0.5,
          rotation: 180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.6,
        }
      );

      // Floating elements
      gsap.to(".admin-floating", {
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

      // Background gradient animation
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

  return (
    <section
      ref={heroRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F86D72]/10 via-white to-[#ff9aa1]/10"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(248, 109, 114, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 154, 161, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(248, 109, 114, 0.08) 0%, transparent 50%)
        `,
        backgroundSize: "400% 400%",
      }}
    >
      {/* Particle System */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="admin-floating absolute top-20 left-10 w-32 h-32 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="admin-floating absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        <div className="admin-floating absolute bottom-20 left-1/4 w-28 h-28 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="admin-floating absolute bottom-40 right-1/3 w-36 h-36 bg-[#ff9aa1]/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="hero-content">
          {/* Admin Badge */}
          <div className="admin-badge inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Crown className="w-5 h-5" />
            ADMINISTRATOR
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance">
            Welcome Back,
            <br />
            <span className="text-[#F86D72]">Admin</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Manage your bookstore with powerful tools and insights. 
            You have full control over books, categories, and user management.
          </p>

          {/* Admin Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
              <Shield className="w-6 h-6 text-[#F86D72]" />
              <span className="text-gray-700 font-semibold">Full Access</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
              <Settings className="w-6 h-6 text-[#F86D72]" />
              <span className="text-gray-700 font-semibold">Manage All</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
              <Star className="w-6 h-6 text-[#F86D72]" />
              <span className="text-gray-700 font-semibold">Premium Tools</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfileHero;
