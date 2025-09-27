"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicalTitle from "./MagicalTitle";

gsap.registerPlugin(ScrollTrigger);

const AboutStats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createStatsParticles = () => {
        const particles = [];
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement("div");
          particle.className = "stats-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: linear-gradient(45deg, #F86D72, #ff9aa1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.4 + 0.1};
            pointer-events: none;
          `;
          statsRef.current?.appendChild(particle);
          particles.push(particle);
        }
        return particles;
      };

      const particles = createStatsParticles();

      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        gsap.to(particle, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          duration: Math.random() * 8 + 4,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      });

      countersRef.current.forEach((counter, index) => {
        if (counter) {
          const target = parseInt(counter.dataset.target || "0");

          ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
              gsap.fromTo(
                counter,
                {
                  scale: 0.5,
                  rotation: 180,
                  opacity: 0,
                },
                {
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                }
              );

              gsap.fromTo(
                counter,
                { textContent: 0 },
                {
                  textContent: target,
                  duration: 2.5,
                  ease: "power2.out",
                  snap: { textContent: 1 },
                  onUpdate: function () {
                    const currentValue = Math.ceil(
                      this.targets()[0].textContent
                    );
                    counter.textContent = currentValue.toLocaleString();

                    gsap.to(counter, {
                      scale: 1.1,
                      duration: 0.1,
                      yoyo: true,
                      repeat: 1,
                    });
                  },
                  onComplete: () => {
                    gsap.to(counter, {
                      scale: 1.2,
                      duration: 0.2,
                      yoyo: true,
                      repeat: 1,
                      ease: "power2.out",
                    });
                  },
                }
              );
            },
          });
        }
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -15,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".stat-counter"), {
              scale: 1.1,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".glow-effect"), {
              opacity: 0.3,
              scale: 1.2,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".stat-counter"), {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".glow-effect"), {
              opacity: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          gsap.to(card, {
            y: -8,
            rotation: 2,
            duration: 4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.8,
          });
        }
      });

      gsap.to(statsRef.current, {
        backgroundPosition: "100% 100%",
        duration: 15,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      number: 10000,
      label: "Happy Readers",
      icon: "📚",
      color: "from-[#F86D72] to-[#ff9aa1]",
      bgColor: "bg-gradient-to-br from-[#F86D72]/5 to-[#ff9aa1]/5",
    },
    {
      number: 5000,
      label: "Books Sold",
      icon: "🛒",
      color: "from-[#ff9aa1] to-[#F86D72]",
      bgColor: "bg-gradient-to-br from-[#ff9aa1]/5 to-[#F86D72]/5",
    },
    {
      number: 500,
      label: "Book Titles",
      icon: "📖",
      color: "from-[#F86D72] to-[#ff9aa1]",
      bgColor: "bg-gradient-to-br from-[#F86D72]/5 to-[#ff9aa1]/5",
    },
    {
      number: 50,
      label: "Countries",
      icon: "🌍",
      color: "from-[#ff9aa1] to-[#F86D72]",
      bgColor: "bg-gradient-to-br from-[#ff9aa1]/5 to-[#F86D72]/5",
    },
  ];

  return (
    <section
      ref={statsRef}
      className="py-20 bg-white relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(248, 109, 114, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(255, 154, 161, 0.03) 0%, transparent 50%)
        `,
        backgroundSize: "200% 200%",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <MagicalTitle className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Our Impact in Numbers
          </MagicalTitle>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're proud of the community we've built and the stories we've
            shared
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`stat-card group relative overflow-hidden rounded-3xl ${stat.bgColor} p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer`}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="stat-icon text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div
                  ref={(el) => {
                    countersRef.current[index] = el;
                  }}
                  data-target={stat.number}
                  className="stat-counter text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                >
                  0
                </div>
                <div className="stat-label text-lg font-semibold text-gray-600">
                  {stat.label}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div
                className={`glow-effect absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
