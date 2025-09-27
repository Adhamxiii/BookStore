"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 80,
              rotationX: 15,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
              delay: index * 0.2,
            }
          );

          // Hover effects
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });

            // Icon animation
            const icon = card.querySelector(".info-icon");
            if (icon) {
              gsap.to(icon, {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            const icon = card.querySelector(".info-icon");
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          // Continuous floating animation
          gsap.to(card, {
            y: -5,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5,
          });
        }
      });

    }, infoRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@bookstore.com", "support@bookstore.com"],
      color: "from-green-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Book Street", "Reading City, RC 12345"],
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
  ];

  return (
    <section ref={infoRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Multiple ways to reach us. Choose what works best for you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`${info.bgColor} group relative overflow-hidden rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`info-icon inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {info.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
