"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ContactHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createParticles = () => {
        const particles = [];
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement("div");
          particle.className = "contact-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: linear-gradient(45deg, #F86D72, #ff9aa1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
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
          x: `+=${Math.random() * 150 - 75}`,
          y: `+=${Math.random() * 150 - 75}`,
          duration: Math.random() * 8 + 4,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.15,
        });

        gsap.to(particle, {
          rotation: 360,
          duration: Math.random() * 15 + 10,
          ease: "none",
          repeat: -1,
        });
      });

      const titleText = titleRef.current?.textContent || "";
      if (titleRef.current) {
        titleRef.current.innerHTML = titleText
          .split("")
          .map(
            (char) =>
              `<span class="char" style="display: inline-block;">${
                char === " " ? "&nbsp;" : char
              }</span>`
          )
          .join("");

        const chars = titleRef.current.querySelectorAll(".char");

        gsap.set(chars, {
          opacity: 0,
          y: 80,
          rotationX: 45,
          transformOrigin: "50% 50% -50px",
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          stagger: 0.03,
          delay: 0.3,
        });
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: 1.5,
          }
        );
      }

      gsap.to(".contact-floating", {
        y: -25,
        x: 15,
        rotation: 180,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 2,
          from: "random",
        },
      });

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          backgroundPosition: "150% 150%",
          duration: 25,
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
      className="relative md:min-h-[90vh] min-h-[120vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F86D72]/5 via-white to-[#ff9aa1]/5"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 75%, rgba(248, 109, 114, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(255, 154, 161, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(248, 109, 114, 0.03) 0%, transparent 50%)
        `,
        backgroundSize: "300% 300%",
      }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="contact-floating absolute top-20 left-10 w-24 h-24 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="contact-floating absolute top-40 right-20 w-36 h-36 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        <div className="contact-floating absolute bottom-20 left-1/4 w-28 h-28 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="contact-floating absolute bottom-40 right-1/3 w-32 h-32 bg-[#ff9aa1]/10 rounded-full blur-xl" />

        <div className="contact-floating absolute top-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-full blur-lg opacity-15" />
        <div className="contact-floating absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-[#ff9aa1] to-[#F86D72] rounded-full blur-lg opacity-15" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance"
        >
          Get In Touch
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          We&apos;d love to hear from you! Whether you have questions about our
          books, need support, or just want to say hello, we&apos;re here to help.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
