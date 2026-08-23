"use client";

import React from "react";
import { Button } from "@heroui/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Banner({
  title = "Elevate Your Style with FashionCorner",
  subtitle = "Discover the latest minimalist trends crafted for modern comfort and timeless elegance. Explore our exclusive black & white collections today.",
  ctaText = "Shop Collection",
  ctaLink = "/products",
  image = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-6">
      {/* Container with Background Image */}
      <div 
        className="relative overflow-hidden rounded-3xl shadow-sm bg-cover bg-center min-h-[420px] flex items-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Dark / Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center w-full">
          
          {/* Left Content Area */}
          <div className="p-8 sm:p-12 space-y-6 text-center lg:text-left flex flex-col justify-center">
            <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs font-extrabold uppercase tracking-widest text-gray-300">
              <Sparkles className="w-4 h-4 text-primary" /> New Monochrome Arrivals
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {title}
            </h1>
            
            <p className="text-gray-200 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
              {subtitle}
            </p>
            
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              <Link href={ctaLink}>
                <Button
                  color="primary"
                  size="lg"
                  className="font-bold px-8 shadow-md"
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  {ctaText}
                </Button>
              </Link>
              <Link href="/orders">
                <Button
                  variant="bordered"
                  size="lg"
                  className="font-bold border-white/40 text-white hover:bg-white/10"
                >
                  Track Order
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side empty space to balance the grid layout */}
          <div className="hidden lg:block" />

        </div>
      </div>
    </div>
  );
}