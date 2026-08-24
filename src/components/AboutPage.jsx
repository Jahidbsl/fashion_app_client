import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-default-500 bg-default-100 px-3 py-1 rounded-full">
          <Sparkles className="w-4 h-4 text-primary" /> Welcome to FashionCorner
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-default-950">
          Redefining Modern Elegance & Minimalist Style
        </h1>
        <p className="text-default-500 text-base sm:text-lg max-w-2xl mx-auto">
          At FashionCorner, we believe that fashion should be effortless, comfortable, and timeless. Discover monochrome collections crafted for the modern lifestyle.
        </p>
      </section>

      {/* Image & Story Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md">
          <Image
            fill
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="FashionCorner Store"
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-default-900">Our Story</h2>
          <p className="text-default-600 leading-relaxed">
            Founded with a passion for clean lines and superior comfort, FashionCorner started as a vision to bring high-quality, minimalist apparel to everyone who values sophistication without compromising on ease.
          </p>
          <p className="text-default-600 leading-relaxed">
            From our carefully curated black & white collections to our seamless online shopping experience, every detail is designed keeping you in mind. We source ethical fabrics to ensure that what you wear feels as good as it looks.
          </p>
        </div>
      </section>

      {/* Why Choose Us Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-default-900">
          Why Choose FashionCorner?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-content1 p-8 rounded-2xl shadow-sm border border-default-200 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Fast & Reliable Delivery</h3>
            <p className="text-default-500 text-sm">
              We ensure your favorite outfits reach your doorstep swiftly and securely.
            </p>
          </div>

          <div className="bg-content1 p-8 rounded-2xl shadow-sm border border-default-200 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Premium Quality</h3>
            <p className="text-default-500 text-sm">
              Crafted from top-tier fabrics designed for durability and timeless comfort.
            </p>
          </div>

          <div className="bg-content1 p-8 rounded-2xl shadow-sm border border-default-200 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Easy Returns</h3>
            <p className="text-default-500 text-sm">
              Hassle-free exchange and return policies because your satisfaction matters.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}