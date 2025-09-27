"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Map entrance animation
      gsap.fromTo(
        mapRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: 15,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
          },
        }
      );

      // Overlay animation
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Floating animation for map elements
      gsap.to(".map-floating", {
        y: -10,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Us Here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our physical store or explore our location
          </p>
        </div>

        <div className="relative">
          {/* Map Container */}
          <div
            ref={mapRef}
            className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Map Background (Placeholder) */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
              {/* Map Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-12 grid-rows-12 h-full">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-gray-300"
                      style={{
                        backgroundColor: i % 3 === 0 ? "rgba(248, 109, 114, 0.1)" : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Map Markers */}
              <div className="map-floating absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-[#F86D72] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 w-8 h-8 bg-[#F86D72] rounded-full animate-ping opacity-30" />
                </div>
              </div>

              {/* Additional Map Elements */}
              <div className="map-floating absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full opacity-60" />
              <div className="map-floating absolute top-3/4 right-1/4 w-3 h-3 bg-green-500 rounded-full opacity-60" />
              <div className="map-floating absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-500 rounded-full opacity-60" />
            </div>

            {/* Map Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            />

            {/* Location Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#F86D72] rounded-xl flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">BookStore Main Location</h3>
                    <p className="text-sm text-gray-600">123 Book Street, Reading City</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Distance:</span>
                    <span className="ml-2 font-semibold">2.3 km</span>
                  </div>
                  <div>
                    <span className="text-gray-500">ETA:</span>
                    <span className="ml-2 font-semibold">8 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#F86D72]/10 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
