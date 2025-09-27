"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, User, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );

      // Input field animations
      const inputs = formRef.current?.querySelectorAll(".form-input");
      inputs?.forEach((input, index) => {
        gsap.fromTo(
          input,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2 + index * 0.1,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      });

      // Button animation
      const button = formRef.current?.querySelector(".submit-btn");
      if (button) {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.6,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      }

    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Show success animation
    if (formRef.current) {
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={formRef}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Send us a Message
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we'll get back to you as soon as possible
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-input relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#F86D72] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="form-input relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#F86D72] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>

        <div className="form-input relative">
          <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            required
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#F86D72] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
          />
        </div>

        <div className="form-input relative">
          <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
            rows={6}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#F86D72] focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn w-full bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
