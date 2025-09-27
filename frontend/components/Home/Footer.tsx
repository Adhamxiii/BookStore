"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  BookOpen,
  Heart,
  Shield,
  Truck
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.fromTo(
        ".footer-section",
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Footer elements animation
      gsap.fromTo(
        ".footer-element",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
          delay: 0.3,
        }
      );

      // Floating elements
      gsap.to(".footer-floating", {
        y: -10,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="footer-floating absolute top-20 left-20 w-32 h-32 bg-[#F86D72]/10 rounded-full blur-xl" />
        <div className="footer-floating absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/10 rounded-full blur-xl" />
        <div className="footer-floating absolute bottom-20 left-1/4 w-24 h-24 bg-[#F86D72]/10 rounded-full blur-xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="footer-section max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="footer-element lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <Image
                  src="/logo.png"
                  alt="BookStore Logo"
                  width={157}
                  height={40}
                  className="object-contain filter brightness-0 invert"
                />
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted destination for discovering amazing books. We're passionate about connecting readers with stories that inspire, educate, and entertain.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#F86D72] rounded-full flex items-center justify-center hover:bg-[#dd6165] transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#F86D72] rounded-full flex items-center justify-center hover:bg-[#dd6165] transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#F86D72] rounded-full flex items-center justify-center hover:bg-[#dd6165] transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#F86D72] rounded-full flex items-center justify-center hover:bg-[#dd6165] transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-element">
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/books" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    All Books
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-element">
              <h3 className="text-xl font-bold mb-6">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/books?category=fiction" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Fiction
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=non-fiction" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Non-Fiction
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=mystery" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Mystery
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=romance" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Romance
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=sci-fi" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                    Science Fiction
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-element">
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#F86D72]" />
                  <span className="text-gray-300">123 Book Street, Reading City, RC 12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#F86D72]" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#F86D72]" />
                  <span className="text-gray-300">info@bookstore.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#F86D72]" />
                  <span className="text-gray-300">Mon-Fri: 9AM-8PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="footer-section border-t border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="footer-element text-center">
                <div className="w-16 h-16 bg-[#F86D72]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-[#F86D72]" />
                </div>
                <h4 className="font-bold mb-2">Free Shipping</h4>
                <p className="text-gray-300 text-sm">On orders over $50</p>
              </div>
              <div className="footer-element text-center">
                <div className="w-16 h-16 bg-[#F86D72]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#F86D72]" />
                </div>
                <h4 className="font-bold mb-2">Secure Payment</h4>
                <p className="text-gray-300 text-sm">100% secure checkout</p>
              </div>
              <div className="footer-element text-center">
                <div className="w-16 h-16 bg-[#F86D72]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#F86D72]" />
                </div>
                <h4 className="font-bold mb-2">Quality Books</h4>
                <p className="text-gray-300 text-sm">Carefully curated selection</p>
              </div>
              <div className="footer-element text-center">
                <div className="w-16 h-16 bg-[#F86D72]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#F86D72]" />
                </div>
                <h4 className="font-bold mb-2">Customer Care</h4>
                <p className="text-gray-300 text-sm">24/7 support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-section border-t border-gray-700 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-300 text-sm">
                © {currentYear} BookStore. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-300 hover:text-[#F86D72] transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
