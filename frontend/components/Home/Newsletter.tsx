"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Newsletter section animation
      gsap.fromTo(
        ".newsletter-section",
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 80%",
          },
        }
      );

      // Newsletter elements animation
      gsap.fromTo(
        ".newsletter-element",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

      // Floating elements
      gsap.to(".newsletter-floating", {
        y: -20,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

    }, newsletterRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate subscription
    setIsSubscribed(true);
    toast.success("Successfully subscribed to our newsletter!");
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section ref={newsletterRef} className="py-20 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="newsletter-floating absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="newsletter-floating absolute top-40 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl" />
        <div className="newsletter-floating absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="newsletter-floating absolute bottom-40 right-1/3 w-36 h-36 bg-white/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="newsletter-section text-center">
          <div className="newsletter-element mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Mail className="w-5 h-5" />
              Stay Updated
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Never Miss a Great Read
              <br />
              <span className="text-yellow-300">Subscribe to Our Newsletter</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get the latest book releases, exclusive deals, and reading recommendations 
              delivered straight to your inbox. Join thousands of book lovers!
            </p>
          </div>

          <div className="newsletter-element max-w-2xl mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 border-2 border-white/20 rounded-2xl focus:border-white focus:outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-lg"
                  disabled={isSubscribed}
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="px-8 py-4 bg-white text-[#F86D72] rounded-2xl font-bold text-lg hover:bg-yellow-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Benefits */}
          <div className="newsletter-element mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center text-white/80">
              <div className="text-3xl mb-2">📚</div>
              <span className="font-semibold">New Releases</span>
            </div>
            <div className="text-center text-white/80">
              <div className="text-3xl mb-2">💰</div>
              <span className="font-semibold">Exclusive Deals</span>
            </div>
            <div className="text-center text-white/80">
              <div className="text-3xl mb-2">⭐</div>
              <span className="font-semibold">Reading Tips</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
