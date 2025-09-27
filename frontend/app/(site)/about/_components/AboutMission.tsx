"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMission = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(card, {
              rotationY: x * 0.1,
              rotationX: -y * 0.1,
              y: -15,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".mission-title"), {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".magical-glow"), {
              opacity: 0.4,
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".mission-title"), {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(card.querySelector(".magical-glow"), {
              opacity: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          gsap.to(card, {
            y: -12,
            rotation: 1,
            duration: 5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 1.2,
          });
        }
      });

      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, missionRef);

    return () => ctx.revert();
  }, []);

  const missions = [
    {
      title: "Accessibility",
      description: "Making books accessible to everyone, regardless of their background or financial situation.",
      icon: "♿",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    {
      title: "Quality",
      description: "Curating only the finest books and ensuring every recommendation meets our high standards.",
      icon: "⭐",
      color: "bg-gradient-to-br from-yellow-500 to-orange-600",
    },
    {
      title: "Community",
      description: "Building a vibrant community where readers can connect, share, and discover together.",
      icon: "🤝",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      title: "Innovation",
      description: "Embracing technology to enhance the reading experience while preserving the magic of books.",
      icon: "💡",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
  ];

  return (
    <section ref={missionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="parallax-bg absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#F86D72] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#ff9aa1] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Mission & Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in the transformative power of books and are committed to making literature accessible to all
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`absolute inset-0 ${mission.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="mission-icon text-5xl mb-4">{mission.icon}</div>
                <h3 className="mission-title text-2xl font-bold text-gray-900 mb-4">
                  {mission.title}
                </h3>
                <p className="mission-description text-gray-600 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`magical-glow absolute inset-0 bg-gradient-to-br ${mission.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
