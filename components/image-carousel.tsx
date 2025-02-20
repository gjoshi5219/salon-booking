"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto-swipe every 0.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]); // Depend on currentIndex to keep it changing

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Work Image ${currentIndex + 1}`}
          width={1000}
          height={1000} // Increased height to 450px
          className="w-full h-[600px] object-cover rounded-lg"
        />
      </div>

      {/* Left and Right Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black p-3 rounded-full text-white hover:bg-gray-800 transition"
        onClick={prevSlide}
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black p-3 rounded-full text-white hover:bg-gray-800 transition"
        onClick={nextSlide}
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
}
