"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Book Lover",
      avatar: "SJ",
      rating: 5,
      comment: "This bookstore has completely transformed my reading experience. The curated selection and personalized recommendations are outstanding. I've discovered so many amazing books I never would have found elsewhere!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Literature Enthusiast",
      avatar: "MC",
      rating: 5,
      comment: "The quality of books and the attention to detail in their recommendations is incredible. Every book I've purchased has been exactly what I was looking for. Highly recommend to any book lover!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Reading Blogger",
      avatar: "ER",
      rating: 5,
      comment: "As someone who reads extensively, I can confidently say this is one of the best bookstores I've encountered. Their collection is diverse, well-organized, and their customer service is exceptional.",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Author",
      avatar: "DT",
      rating: 5,
      comment: "Not only do they have an amazing selection of books, but they also support local authors and provide a platform for discovering new voices. This is what a community bookstore should be!",
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Teacher",
      avatar: "LW",
      rating: 5,
      comment: "I've been using this bookstore for my classroom library and the students absolutely love the books I've selected. The educational resources and age-appropriate recommendations are spot-on.",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Business Owner",
      avatar: "JW",
      rating: 5,
      comment: "The online experience is seamless, and the physical books arrive in perfect condition. The packaging is thoughtful and the delivery is always on time. A truly professional service.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Testimonials section animation
      gsap.fromTo(
        ".testimonials-section",
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
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
        }
      );

      // Testimonial cards animation
      gsap.fromTo(
        ".testimonial-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationY: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );

      // Floating elements
      gsap.to(".testimonials-floating", {
        y: -15,
        duration: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

    }, testimonialsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={testimonialsRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="testimonials-floating absolute top-20 left-20 w-32 h-32 bg-[#F86D72]/5 rounded-full blur-xl" />
        <div className="testimonials-floating absolute top-40 right-20 w-40 h-40 bg-[#ff9aa1]/5 rounded-full blur-xl" />
        <div className="testimonials-floating absolute bottom-20 left-1/4 w-24 h-24 bg-[#F86D72]/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="testimonials-section text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F86D72] to-[#ff9aa1] text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
            <Quote className="w-5 h-5" />
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            What Our Readers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our amazing community of book lovers has to say about their experience with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card group">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[#F86D72]/30" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F86D72] to-[#ff9aa1] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="testimonials-section mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-4xl font-bold text-[#F86D72] mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-4xl font-bold text-[#F86D72] mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="text-4xl font-bold text-[#F86D72] mb-2">50K+</div>
            <div className="text-gray-600">Books Sold</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
