"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  isOnSale?: boolean;
  discountPercent?: number;
  isFeatured?: boolean;
  stock?: number;
  createdAt?: string;
  category?: {
    _id: string;
    name: string;
  };
  description?: string;
  pages?: number;
  language?: string;
  publisher?: string;
  isbn?: string;
}

interface BookGalleryProps {
  book: Book;
}

const BookGallery = ({ book }: BookGalleryProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    book.coverImage,
    book.coverImage,
    book.coverImage,
    book.coverImage,
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-section",
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".gallery-thumbnail",
        {
          opacity: 0,
          scale: 0.8,
          rotation: 10,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div ref={galleryRef} className="space-y-6">
        <div className="gallery-section relative group">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white">
            <Image
              src={
                images[selectedImage]?.startsWith("http")
                  ? images[selectedImage]
                  : `${
                      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
                    }/images/${images[selectedImage]}`
              }
              alt={`${book.title} - Image ${selectedImage + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-white hover:text-[#F86D72] transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full shadow-lg hover:bg-white hover:text-[#F86D72] transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>

        <div className="gallery-section grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`gallery-thumbnail relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedImage === index
                  ? "ring-4 ring-[#F86D72] scale-105 shadow-lg"
                  : "hover:scale-105 shadow-md"
              }`}
            >
              <Image
                src={
                  image?.startsWith("http")
                    ? image
                    : `${
                        process.env.NEXT_PUBLIC_API_URL ||
                        "http://localhost:3001"
                      }/images/${image}`
                }
                alt={`${book.title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-[#F86D72]/20" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookGallery;
