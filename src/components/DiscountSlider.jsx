"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getDiscounts } from "@/lib/actions/Discounts";
import { getProducts } from "@/lib/actions/Products";

export default function DiscountSlider() {
  const [discountList, setDiscountList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscountData() {
      try {
        const [discountsRes, productsRes] = await Promise.all([
          getDiscounts(),
          getProducts(),
        ]);

        const discounts = discountsRes?.success
          ? discountsRes.discounts
          : Array.isArray(discountsRes)
            ? discountsRes
            : [];
        const products = productsRes?.success
          ? productsRes.products
          : Array.isArray(productsRes)
            ? productsRes
            : [];

        const combined = discounts
          .map((discount) => {
            let product = products.find(
              (p) =>
                String(p._id) ===
                String(discount.productId || discount.product),
            );

            if (!product && products.length > 0) {
              product = products[0];
            }

            return product ? { ...discount, product } : null;
          })
          .filter(Boolean);

        setDiscountList(combined);
      } catch (error) {
        console.error("Failed to load discount banners:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscountData();
  }, []);

  useEffect(() => {
    if (discountList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % discountList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [discountList.length]);

  if (loading || discountList.length === 0) {
    return null;
  }

  const currentItem = discountList[currentIndex];
  if (!currentItem || !currentItem.product) return null;

  const { product, percentage, code } = currentItem;

  const originalPrice = Number(product.price);
  const discountAmount = (originalPrice * percentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  const displayImage =
    product.variants?.[0]?.imageUrl || "https://placehold.co/600x400";

  return (
    <div className="w-full max-w-7xl mx-auto my-6 px-4 overflow-hidden">
      {/* Container width and styling matched with Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-content1/40 backdrop-blur-md shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="contents"
            >
              {/* Left Content Area */}
              <div className="p-8 sm:p-12 space-y-6 text-center lg:text-left z-10 flex flex-col justify-center">
                <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs font-extrabold uppercase tracking-widest text-primary">
                  <Sparkles className="w-4 h-4" /> {percentage}% OFF (Code: {code})
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-default-950 tracking-tight leading-tight">
                  {product.name}
                </h2>

                <p className="text-default-500 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 line-clamp-2">
                  {product.description ||
                    "Grab this exclusive item at a special discounted price for a limited time only."}
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-4 pt-1">
                  <span className="text-2xl font-black text-default-950">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-default-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="pt-2">
                  <Link href={`/products/${product._id}`}>
                    <Button
                      color="primary"
                      size="lg"
                      className="font-bold px-8 shadow-md"
                      endContent={<ArrowRight className="w-4 h-4" />}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Image Graphic Area */}
              <div className="relative h-64 sm:h-80 lg:h-full w-full bg-default-100 overflow-hidden">
                <Image
                  fill
                  src={displayImage}
                  alt={product.name || "Discount product"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 lg:bg-gradient-to-r lg:from-content1/80 lg:to-transparent z-10" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators (Dots) */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {discountList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-default-300 hover:bg-default-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}