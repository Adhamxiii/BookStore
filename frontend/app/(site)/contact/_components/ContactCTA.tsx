"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactCTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA section animation
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

      // Button animations
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
          delay: 0.3,
        }
      );

      // Floating animation for background elements
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
    <section ref={ctaRef} className="py-20 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cta-floating absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="cta-floating absolute top-40 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl" />
        <div className="cta-floating absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="cta-floating absolute bottom-40 right-1/3 w-36 h-36 bg-white/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="cta-content">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Connect?
            <br />
            <span className="text-yellow-300">Let's Talk!</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're here to help with any questions you might have. 
            Reach out to us through any of our channels.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="#contact-form" 
              className="cta-button px-8 py-4 bg-white text-[#F86D72] rounded-full font-bold text-lg hover:bg-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Send Message
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="tel:+15551234567" 
              className="cta-button px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#F86D72] rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-white/80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📧</span>
              <span className="font-semibold">24/7 Email Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📞</span>
              <span className="font-semibold">Live Chat Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              <span className="font-semibold">Quick Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
